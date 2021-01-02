<template>
  <section class="container grid_container flex_center">
    <div class="grid_100 editor_title_ctnr">
      <!-- <h3 class="is-size-6 editor_title_hdr">제목:</h3> -->
      <input
        class="editor_title_input is-size-4"
        type="text"
        placeholder="Title.."
        v-model="title"
      />
    </div>
    <!-- <div class="grid_100 editor_title_ctnr">
      <h3 class="is-size-6 editor_title_hdr">커버 사진:</h3>
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        v-if="!coverimage"
      />
      <div v-else>
        <CoverImage :url="coverimage" />
        <button @click="removeImage">Remove image</button>
      </div>
    </div>-->
    <div class="grid_100">
      <div
        class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        ref="myQuillEditor"
        v-quill:myQuillEditor="editorOption"
      ></div>
    </div>
    <p class="err_text">{{ this.error }}</p>
    <button class="button" @click="onSubmit($event)" v-if="!editid">
      업로드
    </button>
    <button class="button" @click="onEdit($event)" v-else>수정</button>
  </section>
</template>

<style lang="scss" scoped>
.err_text {
  margin-bottom: 1rem;
  color: red;
}
.editor_title_ctnr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.editor_title_input {
  padding: 1rem;
  border: 0;
  width: 100%;
  outline: 0;
  background: white;
  border-bottom: 1px solid lightgrey;
  font-weight: 600;
}
.editor_title_hdr {
  font-weight: 600;
}
.container {
  padding: 0 25px;
  box-sizing: border-box;
}
.submit_btn {
  cursor: pointer;
  outline: none;
  background-color: transparent;
  // border: none;
  // border-top: 1px solid lightgray;
  border: 1px solid lightgray;

  // box-shadow: 0;
  width: 100%;
  padding: 30px 5%;
  box-sizing: border-box;
  // font-weight: 600;
  font-size: 18px;
}

.ql-container {
  border: none !important;
}
.ql-editor {
  // padding: 15px 30px !important;
  // @media only screen and (max-width: 700px) {
  //   padding: 15px 30px !important;
  // }
  // min-height: 400px;
}
.quill-editor {
  // padding: 10px 20% !important;
  // border: none !important;
  // @media only screen and (max-width: 700px) {
  //   padding: 0 !important;
  // }
}

.ql-toolbar {
  // padding: 10px 20% !important;
  // border: none !important;
  // @media only screen and (max-width: 700px) {
  //   padding: 0 10px !important;
  // }
}
</style>

<script>
import { blobToBase64String, base64StringToBlob } from 'blob-util'
import Compressor from 'compressorjs'
// import CoverImage from './CoverImageUploader'

export default {
  components: {
    // CoverImage
  },
  props: ['edit', 'edititle', 'editcontent', 'editid', 'category', 'user_type'],
  data() {
    return {
      error_status: 0,
      error: '',
      title: this.edititle ? this.edititle : '',
      coverimage: '',
      failed_images: [],
      content: this.editcontent ? this.editcontent : '<p>Replace Me!</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          // imageDrop: true,
          // imageUploader: {
          //   upload: file => {
          //     return new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         resolve(
          //           'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
          //         )
          //       }, 3500)
          //     })
          //   }
          // },
          imageDropAndPaste: {
            // add an custom image handler
            handler: this.imageHandler
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        },
        placeholder: ''
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
  },
  methods: {
    imageHandler(imageDataUrl, type) {
      // give a default mime type if the type was null
      if (!type) type = 'image/png'

      // base64 to blob
      let blob = base64StringToBlob(
        imageDataUrl.replace(/^data:image\/\w+;base64,/, ''),
        type
      )

      // var filename = [
      //   'my',
      //   'cool',
      //   'image',
      //   '-',
      //   Math.floor(Math.random() * 1e12),
      //   '-',
      //   new Date().getTime(),
      //   '.',
      //   type.match(/^image\/(\w+)$/i)[1]
      // ].join('')

      const quill = this.$refs.myQuillEditor.__quill
      new Compressor(blob, {
        quality: 0.6,
        convertSize: 1000000,
        success(result) {
          const formData = new FormData()
          blobToBase64String(result).then(res => {
            const index =
              (quill.getSelection() || {}).index || quill.getLength()
            if (index) {
              quill.insertEmbed(
                index,
                'image',
                `data:${result.type};base64,` + res,
                'user'
              )
            }
          })
          // formData.append('file', result, result.name)

          // const index = (quill.getSelection() || {}).index || quill.getLength()
          // if (index) {
          //   quill.insertEmbed(index, 'image', imageDataUrl, 'user')
          // }
          // const formData = new FormData()
          // The third parameter is required for server
          // formData.append('file', result, result.name)
          // Send the compressed image file to server with XMLHttpRequest.
          // axios.post('/path/to/upload', formData).then(() => {
          // })
        },
        error(err) {
          //toast
          console.log(err.message)
        }
      })

      // var filename = [
      //   'my',
      //   'cool',
      //   'image',
      //   '-',
      //   Math.floor(Math.random() * 1e12),
      //   '-',
      //   new Date().getTime(),
      //   '.',
      //   type.match(/^image\/(\w+)$/i)[1]
      // ].join('')

      // generate a form data
      //----
      // var formData = new FormData()
      // formData.append('filename', filename)
      // formData.append('file', blob)

      // upload image to your server
      // callUploadAPI(your_upload_url, formData, (err, res) => {
      // if (err) return
      // success? you should return the uploaded image's url
      // then insert into the quill editor

      // })
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    async onEdit(event) {
      this.error = ''
      // if (this.error_status === 0) {
      //   try {
      //     result = await this.$axios.post('/1/article', {
      //       preview: '',
      //       title: this.title
      //     })
      //   } catch (err) {
      //     console.log(err)
      //     this.error = 'Please try again'
      //     return
      //   }
      // }

      var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g
      let preexistings = this.content.match(expression) || []
      let indicesdict = {}
      for (let i = 0; i < preexistings.length; i++) {
        if (
          preexistings[i].startsWith('https://d2rkgndbm9lqnh.cloudfront.net')
        ) {
          indicesdict[
            parseInt(
              preexistings[i].substr(preexistings[i].lastIndexOf('/') + 1)
            )
          ] = true
        }
      }

      let count = (this.content.match(/<img/g) || []).length

      for (let i = 1; i <= count; i++) {
        let a = this.content.split('<img', i).join('<img').length //index of i'th occurance of <img
        let b = this.content.indexOf('src', a) //index of i'th occurance of src
        let c = this.content.substring(a, b + 5) //split from <img to src="
        let d = this.content.substring(b + 5)
        let e = d.indexOf('"')
        let f = d.substring(0, e)
        let g = f.indexOf(';')
        let h = f.substring(5, g)
        if (f.startsWith('http')) continue

        let blob = base64StringToBlob(
          f.replace(/^data:image\/\w+;base64,/, ''),
          h
        )
        let file = this.blobToFile(blob)
        let key_ind = i
        while (indicesdict[key_ind]) {
          key_ind++
        }
        indicesdict[key_ind] = true
        try {
          let key = `article/${this.editid}/${key_ind}`
          let new_url = await this.postS3(file, key)
          this.content = this.content.replace(
            f,
            'https://d2rkgndbm9lqnh.cloudfront.net/' + key
          )
        } catch (err) {
          console.log(err)
          this.failed_images.push({ f, h })
        }
      }
      if (this.failed_images.length > 0) {
        this.error = 'Please try again'
        return
      }

      try {
        await this.$axios.post('/2/article/update', {
          id: this.editid,
          title: this.title,
          content: this.content
        })
      } catch (err) {
        console.log(err)
        this.error_status = 1
        this.error = 'Please try again'
      }
      // this.$axios
      //   .post('/1/article', {
      //     content: this.content,
      //     preview: '',
      //     title: this.title
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    async onSubmit(event) {
      this.error = ''
      let result = this.saved_result ? this.saved_result : ''

      if (this.error_status === 0) {
        try {
          result = await this.$axios.post(`/${this.user_type}/article`, {
            preview: '',
            title: this.title,
            category: this.category
          })
        } catch (err) {
          console.log(err)
          this.error = 'Please try again'
          return
        }
      }

      let count = (this.content.match(/<img/g) || []).length
      for (let i = 1; i <= count; i++) {
        let a = this.content.split('<img', i).join('<img').length //index of i'th occurance of <img
        let b = this.content.indexOf('src', a) //index of i'th occurance of src
        let c = this.content.substring(a, b + 5) //split from <img to src="
        let d = this.content.substring(b + 5)
        let e = d.indexOf('"')
        let f = d.substring(0, e)
        let g = f.indexOf(';')
        let h = f.substring(5, g)
        if (f.startsWith('http')) continue

        let blob = base64StringToBlob(
          f.replace(/^data:image\/\w+;base64,/, ''),
          h
        )
        let file = this.blobToFile(blob)
        try {
          let key = `article/${result.data.id}/${i}`
          let new_url = await this.postS3(file, key)
          this.content = this.content.replace(
            f,
            'https://d2rkgndbm9lqnh.cloudfront.net/' + key
          )
        } catch (err) {
          this.failed_images.push({ f, h })
        }
      }
      if (this.failed_images.length > 0) {
        this.saved_result = result
        this.error = 'Please try again'
        return
      }

      try {
        result = await this.$axios.post('/2/article/update', {
          id: result.data.id,
          content: this.content
        })
      } catch (err) {
        this.error_status = 1
        this.saved_result = result
        this.error = 'Please try again'
      }
      // this.$axios
      //   .post('/1/article', {
      //     content: this.content,
      //     preview: '',
      //     title: this.title
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    async postS3(file, key) {
      try {
        let signedputurl = await this.$axios.get('/photo/upload/url?key=' + key)
        let res = await this.$axios.put(signedputurl.data.url, file, {
          headers: {
            'Content-Type': file.type
          }
        })
        return res
      } catch (err) {
        //toast
        console.log(err)
      }
    },
    blobToFile(blob) {
      return new File([blob], 'extracted_image', {
        type: blob.type,
        lastModified: new Date('2012.08.10').getTime() / 1000
      })
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = e => {
        vm.coverimage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function(e) {
      this.coverimage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  // margin: 0 auto;
  // padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>

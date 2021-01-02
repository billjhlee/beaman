<template>
  <div class>
    <section class="article_content">
      <div
        ref="myQuillEditor"
        class="quill-editor"
        :content="content"
        v-quill:myQuillEditor="editorOption"
        :disabled="true"
        @ready="onEditorReady($event)"
      ></div>
    </section>
  </div>
</template>
<style lang="scss">
.article_header {
  padding: 0 40px;
}

.article_content {
  padding: 0 25px;
}
.ql-container {
  border: none !important;
}
.ql-editor {
  padding: 0;
}

.reply_section {
  // padding-left: 40px;
}
</style>
<script>
export default {
  props: ['content'],
  data() {
    return {
      editorOption: {
        disabled: true,
        // some quill options
        modules: {
          toolbar: false
        },
        placeholder: ''
      }
    }
  },
  methods: {
    onEditorReady(editor) {
      // editor.disabled = true
    }
  }
}
</script>

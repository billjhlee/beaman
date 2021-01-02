import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import ImageResize from 'quill-image-resize-module'

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// import { ImageDrop } from 'quill-image-drop-module'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import ImageUploader from 'quill-image-uploader'

Quill.register('modules/imageUploader', ImageUploader)
// Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
// Vue.use(Quill)
// Vue.use(ImageResize)

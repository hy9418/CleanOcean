<template>
  <file-pond
    name="test"
    ref="pond"
    allow-multiple="false"
    label-idle="请上传图片"
    accepted-file-types="image/jpeg, image/png"
    v-bind:files="myFiles"
    v-on:addfile="handleFilePondAdd"
  />
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
export default {
  name: "FileUpload",
  data: function() {
    return { myFiles: [] };
  },
  components: {
    FilePond
  },
  methods: {
    handleFilePondAdd(error, file) {
      if (!error) {
        this.$emit("on-upload", file);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function Tiny() {
  return (
    <Editor
      apiKey="ketv97kf3yx1rztahcoae0mjwi0e5agtpdrvhimfjpqti54z"
      initialValue="<p>Welcome to TinyMCE!</p>"
      init={{
        selector: 'textarea',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
    />
  );
}

export default Tiny;
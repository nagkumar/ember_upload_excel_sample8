$("#my-awesome-dropzone").dropzone({
                                     init: function ()
                                     {
                                       this.on("addedfile", function (file)
                                       {
                                       });

                                       this.on("success", function (file)
                                       {
                                         var fileName = $("#fileName").val();
                                         var fileExt = $("#fileExt").val();
                                         var fileId = $("#fileId").val();
                                         var removeButton = Dropzone.createElement("<a class='dz-remove' onClick=\"return deleteFile('" + fileId + "','" + this.getAcceptedFiles().length + "');\" href='javascript:undefined' data-dz-remove>" + this.options.dictRemoveFile + "</a>");

                                         // Capture the Dropzone instance as closure.
                                         var _this = this;

                                         // Listen to the click event
                                         removeButton.addEventListener("click", function (e)
                                         {
                                           // Make sure the button click doesn't submit the form:
                                           //deleteFile(fileId)
                                           e.preventDefault();
                                           e.stopPropagation();

                                           // Remove the file preview.
                                           _this.removeFile(file);
                                           // If you want to the delete the file on the server as well,
                                           // you can do the AJAX request here.
                                         });

                                         // Add the button to the file preview element.
                                         file.previewElement.appendChild(removeButton);
                                         loadFields(file, this.getAcceptedFiles().length, file.name, fileId, fileExt);
                                         loadAppendedFields();

                                       });


                                     },
                                     accept: function (file, done)
                                     {
                                       // alert(file.type)
                                       var fileSplits = file.name.split('.');
                                       var fileExt = fileSplits[fileSplits.length - 1];
                                       fileExt = fileExt.toLowerCase();
                                       if (fileExt == "csv" || fileExt == "xlsx" || fileExt == "xls")
                                       {

                                         done();
                                       }
                                       else
                                       {
                                         jQuery.gritter.add({
                                                              title: 'Invalid file type.',
                                                              text: 'File type supported csv/xlsx.',
                                                              class_name: 'gritter-error gritter-dark '
                                                            });
                                         this.removeFile(file);
                                         // done("Error! Files of this type are not accepted");
                                       }
                                     },
                                     processing: function (file)
                                     {
                                       if (file.previewElement)
                                       {
                                         file.previewElement.classList.add("dz-processing");
                                         if (file._removeLink)
                                         {
                                           return file._removeLink.textContent = this.options.dictCancelUpload;
                                         }
                                       }
                                       var fileSplits = file.name.split('.');
                                       var fileExt = fileSplits[fileSplits.length - 1];
                                       fileExt = fileExt.toLowerCase();
                                       if (fileExt == "csv" || fileExt == "xlsx" || fileExt == "xls")
                                       {

                                         //var fileName =file.name.substr(0, file.name.lastIndexOf('.')).replace(/ /g, "_");
                                         var fileName = file.name.substr(0, file.name.lastIndexOf('.')).replace(/[^A-Z0-9]+/ig, "_");
                                         var timestamp = new Date() / 1000;
                                         var fileId = fileName + "-" + timestamp;
                                         fileId = fileId.replace(".", "_");

                                         //assign values to form hidden elements
                                         $("#fileId").val(fileId);
                                         $("#fileName").val(fileName);
                                         $("#fileExt").val(fileExt)
                                       }
                                     },
                                     /*uploadprogress: function (file, progress) {
                                      },*/
                                     /* maxfilesreached: function() {
                                      jQuery.gritter.add({
                                      title: 'Warning!!!',
                                      text: 'Maximum Files Reached.',
                                      class_name: 'gritter-info gritter-dark '
                                      });
                                      },*/
                                     uploadprogress: function (file, progress, bytesSent)
                                     {
                                       var node, _i, _len, _ref, _results;
                                       if (file.previewElement)
                                       {
                                         _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
                                         _results = [];
                                         for (_i = 0, _len = _ref.length; _i < _len; _i++)
                                         {
                                           node = _ref[_i];
                                           _results.push(node.style.width = "" + progress + "%");
                                         }
                                         return _results;
                                       }
                                     },
                                     maxfilesexceeded: function (file)
                                     {
                                       jQuery.gritter.add({
                                                            title: 'Error.',
                                                            text: "Cannot add more files as the <br>system supports a maximum of " + $("#dropzone_maxFileCount").val() + " files only.",
                                                            class_name: 'gritter-error gritter-dark '
                                                          });
                                       this.removeFile(file);
                                     },


                                     url: "/" + serverURL + "/dataImport/uploadImportFile",
                                     autoProcessQueue: true,
                                     parallelUploads: 1,
                                     maxFilesize: $("#dropzone_maxFileSize").val(), //MB,
                                     maxFiles: $("#dropzone_maxFileCount").val()   //Maximum number of files allowed
                                     //addRemoveLinks: true
                                     //acceptedFiles: .csv,.xls"
                                     //acceptedMimeTypes: null,
                                   });



//<div class="d-zone-left">
//           <div class="d-zone-1">
//                      <%--<div id="my-awesome-dropzone" class="dropzone dz-clickable">
//                                                              <input type="hidden" name="fileId" id="fileId" /> <input
//type="hidden" name="fileName" id="fileName" /> <input
//type="hidden" name="fileExt" id="fileExt" />
//                                </div>
//                                --%><%--					<p><g:message code="default.dataset.aggregate"  /></p>--%>
//                                                                     <form controller="dataImport" action="uploadImportFile"
//id="my-awesome-dropzone" class="dropzone dz-clickable">
//                               <input type="hidden" name="fileId" id="fileId"/> <input
//type="hidden" name="fileName" id="fileName"/> <input
//type="hidden" name="fileExt" id="fileExt"/>
//                                </form>
//                                </div>
//
//                                <div id="linkingFields"></div>
//
//                                        </div>

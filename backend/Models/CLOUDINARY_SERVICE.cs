using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using backend.Helpers;

namespace backend.Models {
    public class CLOUDINARY_SERVICE{
        private readonly Cloudinary _cloudinary;

        public CLOUDINARY_SERVICE(IOptions<CloudinarySettings> configs){
            var acc = new Account(
                configs.Value.CloudName,
                configs.Value.ApiKey,
                configs.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file){
            var upload_result = new ImageUploadResult();
            if(file.Length > 0){
                using var stream = file.OpenReadStream();
                var upload_params = new ImageUploadParams{
                    File = new FileDescription(file.FileName, stream),
                    Folder = "WebProject"
                };

                upload_result = await _cloudinary.UploadAsync(upload_params);
            }
            return upload_result;
        }
    }
}
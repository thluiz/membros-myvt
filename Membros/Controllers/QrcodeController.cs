using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ZXing;
using System.IO;
using ZXing.CoreCompat.System.Drawing;
using ZXing.QrCode;
using System.Drawing.Imaging;

namespace Membros.Controllers {
    public class QrcodeController : Controller {
        private readonly ILogger<HomeController> _logger;

        public QrcodeController(ILogger<HomeController> logger) {
            _logger = logger;
        }
        
        [HttpGet("qrcode/{protocol}/{url}/{id?}")]
        public FileResult Index(string protocol, string url, string id) {
            var writer = new BarcodeWriter {
                Format = BarcodeFormat.QR_CODE,
                Options = new QrCodeEncodingOptions {
                    Width = 200,
                    Height = 200,
                    Margin = 0
                }
            };

            var qrCodeImage = writer.Write($"{protocol}://{url}/{id}");

            using (var stream = new MemoryStream()) {
                qrCodeImage.Save(stream, ImageFormat.Png);
                
                return File(stream.ToArray(), "image/png");
            }

        }
    }
}

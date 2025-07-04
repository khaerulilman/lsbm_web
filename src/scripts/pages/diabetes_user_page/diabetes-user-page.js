import { encodeMessage } from "../../data/api.js";

export default class EncodingPage {
  async render() {
    return `
    <section class="container mx-auto px-4 py-8 max-w-3xl">
      <div class="flex gap-2 mb-6">
        <div id="encoding-page" class="border-b-2 border-blue-500 text-blue-500 font-medium p-2 cursor-pointer">
          ENCODING MODE
        </div>
        <div id="decoding-page" class="p-2 cursor-pointer hover:text-blue-500">
          DECODING MODE
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4">
          <label class="flex items-center">
            <span>Pilih Gambar:</span>
          </label>
          <div class="ml-6 mt-2">
            <input type="file" id="image-input" accept=".png,.bmp" class="hidden">
            <button id="browse-btn" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
              Browse
            </button>
            <span id="file-name" class="ml-2 text-gray-500">No file selected</span>
          </div>
        </div>

        <div class="mb-4">
          <label class="flex items-center">
            <span>Pesan untuk disisipkan:</span>
          </label>
          <div class="ml-6 mt-2">
            <textarea id="message-input" class="w-full border border-gray-300 rounded p-2" rows="3"></textarea>
          </div>
        </div>

        <div class="mb-4">
          <label class="flex items-center">
            <span>Password:</span>
          </label>
          <div class="ml-6 mt-2">
            <input type="password" id="password-input" class="w-full border border-gray-300 rounded p-2">
          </div>
        </div>

        <button id="encode-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
          Sisipkan Pesan
        </button>

        <div id="result-container" class="hidden mt-6">
          <div class="border border-gray-300 rounded p-4">
            <h3 class="font-medium mb-2">Hasil Encoding:</h3>
            <img id="encoded-image" src="" class="max-w-full mb-4">
            <div class="flex gap-2">
              <button id="download-btn" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                <span id="download-text">Download Gambar</span>
                <span id="download-spinner" class="hidden ml-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
              <a id="cloudinary-link" href="" target="_blank" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" style="display: none;">
                Lihat di Cloudinary
              </a>
            </div>
            <div id="download-error" class="text-red-500 mt-2 hidden"></div>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  async afterRender() {
    document.getElementById("decoding-page").addEventListener("click", () => {
      window.location.hash = "#/decoding";
    });

    const browseBtn = document.getElementById("browse-btn");
    const fileInput = document.getElementById("image-input");
    const fileName = document.getElementById("file-name");
    const encodeBtn = document.getElementById("encode-btn");
    const messageInput = document.getElementById("message-input");
    const passwordInput = document.getElementById("password-input");
    const resultContainer = document.getElementById("result-container");
    const encodedImage = document.getElementById("encoded-image");
    const downloadBtn = document.getElementById("download-btn");
    const cloudinaryLink = document.getElementById("cloudinary-link");
    const downloadText = document.getElementById("download-text");
    const downloadSpinner = document.getElementById("download-spinner");
    const downloadError = document.getElementById("download-error");

    let selectedFile = null;

    // Check if there's a saved result in localStorage
    const lastEncodedImage = localStorage.getItem("lastEncodedImage");
    const lastEncodedFilename = localStorage.getItem("lastEncodedFilename");

    if (lastEncodedImage) {
      encodedImage.src = lastEncodedImage;
      cloudinaryLink.href = lastEncodedImage;
      resultContainer.classList.remove("hidden");
    }

    browseBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        fileName.textContent = selectedFile.name;
      }
    });

    encodeBtn.addEventListener("click", async () => {
      if (!selectedFile) {
        alert("Silakan pilih gambar terlebih dahulu");
        return;
      }

      const message = messageInput.value.trim();
      if (!message) {
        alert("Silakan masukkan pesan yang akan disisipkan");
        return;
      }

      const password = passwordInput.value.trim();
      if (!password) {
        alert("Silakan masukkan password");
        return;
      }

      try {
        encodeBtn.disabled = true;
        encodeBtn.textContent = "Memproses...";

        const result = await encodeMessage(selectedFile, message, password);

        if (result.success) {
          // Save to localStorage
          localStorage.setItem("lastEncodedImage", result.cloudinary_url);
          localStorage.setItem("lastEncodedFilename", result.original_filename);

          // Show result
          encodedImage.src = result.cloudinary_url;
          cloudinaryLink.href = result.cloudinary_url;
          resultContainer.classList.remove("hidden");
          
          // Reset download error if any
          downloadError.classList.add("hidden");
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        alert(`Terjadi kesalahan: ${error.message}`);
      } finally {
        encodeBtn.disabled = false;
        encodeBtn.textContent = "Sisipkan Pesan";
      }
    });

    downloadBtn.addEventListener("click", async () => {
      const imageUrl = encodedImage.src;
      if (!imageUrl || imageUrl === "") {
        downloadError.textContent = "Tidak ada gambar yang tersedia untuk diunduh";
        downloadError.classList.remove("hidden");
        return;
      }

      try {
        // Show loading state
        downloadText.textContent = "Mengunduh...";
        downloadSpinner.classList.remove("hidden");
        downloadBtn.disabled = true;
        downloadError.classList.add("hidden");

        // Add timestamp to URL to avoid caching issues
        const timestamp = new Date().getTime();
        const urlWithTimestamp = imageUrl.includes("?") 
          ? `${imageUrl}&t=${timestamp}`
          : `${imageUrl}?t=${timestamp}`;

        const response = await fetch(urlWithTimestamp, {
          mode: 'cors',
          cache: 'no-cache'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `encoded_${
          localStorage.getItem("lastEncodedFilename") || "image.png"
        }`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Revoke the object URL after some time to avoid memory leaks
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      } catch (error) {
        console.error("Download error:", error);
        downloadError.textContent = `Gagal mengunduh gambar: ${error.message}`;
        downloadError.classList.remove("hidden");
      } finally {
        // Reset button state
        downloadText.textContent = "Download Gambar";
        downloadSpinner.classList.add("hidden");
        downloadBtn.disabled = false;
      }
    });
  }
}

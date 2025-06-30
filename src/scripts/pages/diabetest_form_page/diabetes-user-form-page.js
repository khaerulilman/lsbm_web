import { decodeMessage } from "../../data/api.js";

export default class DecodingPage {
  async render() {
    return `
    <section class="container mx-auto px-4 py-8 max-w-3xl">
      <div class="flex gap-2 mb-6">
        <div id="encoding-page" class="p-2 cursor-pointer hover:text-blue-500">
          ENCODING MODE
        </div>
        <div id="decoding-page" class="border-b-2 border-blue-500 text-blue-500 font-medium p-2 cursor-pointer">
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
            <span>Password:</span>
          </label>
          <div class="ml-6 mt-2">
            <input type="password" id="password-input" class="w-full border border-gray-300 rounded p-2">
          </div>
        </div>

        <div class="flex gap-2 mt-6">
          <button id="decode-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1">
            Ekstrak Pesan
          </button>
          <button id="back-btn" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex-1">
            Kembali ke Menu
          </button>
        </div>

        <div id="result-container" class="hidden mt-6">
          <div class="border border-gray-300 rounded p-4">
            <h3 class="font-medium mb-2">Hasil Decoding:</h3>
            <div id="extracted-message" class="bg-gray-100 p-3 rounded"></div>
            <button id="clear-result-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2">
              Hapus Hasil
            </button>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  async afterRender() {
    document.getElementById("encoding-page").addEventListener("click", () => {
      window.location.hash = "#/encoding";
    });

    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.hash = "#/";
    });

    const browseBtn = document.getElementById("browse-btn");
    const fileInput = document.getElementById("image-input");
    const fileName = document.getElementById("file-name");
    const decodeBtn = document.getElementById("decode-btn");
    const passwordInput = document.getElementById("password-input");
    const resultContainer = document.getElementById("result-container");
    const extractedMessage = document.getElementById("extracted-message");
    const clearResultBtn = document.getElementById("clear-result-btn");

    let selectedFile = null;

    // Check if there's a saved result in localStorage
    const lastDecodedMessage = localStorage.getItem("lastDecodedMessage");
    if (lastDecodedMessage) {
      extractedMessage.textContent = lastDecodedMessage;
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

    decodeBtn.addEventListener("click", async () => {
      if (!selectedFile) {
        alert("Silakan pilih gambar terlebih dahulu");
        return;
      }

      const password = passwordInput.value.trim();
      if (!password) {
        alert("Silakan masukkan password");
        return;
      }

      try {
        decodeBtn.disabled = true;
        decodeBtn.textContent = "Memproses...";

        const result = await decodeMessage(selectedFile, password);

        if (result.success) {
          // Save to localStorage
          localStorage.setItem("lastDecodedMessage", result.extracted_message);

          extractedMessage.textContent = result.extracted_message;
          resultContainer.classList.remove("hidden");
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        alert(`Terjadi kesalahan: ${error.message}`);
      } finally {
        decodeBtn.disabled = false;
        decodeBtn.textContent = "Ekstrak Pesan";
      }
    });

    clearResultBtn.addEventListener("click", () => {
      // Clear from localStorage and hide the result
      localStorage.removeItem("lastDecodedMessage");
      extractedMessage.textContent = "";
      resultContainer.classList.add("hidden");
    });
  }
}

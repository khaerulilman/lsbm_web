export default class LandingPage {
  async render() {
    return `
    <div class="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <!-- Hero Section -->
      <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">LSB Matching (LSBM) Steganography</h1>
          <p class="text-xl md:text-2xl mb-8">Menyembunyikan pesan rahasia dalam gambar dengan teknik yang lebih canggih dari LSB biasa</p>
          <div class="flex justify-center gap-4">
            <a href="#/encoding" class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300">
              Coba Encoding
            </a>
            <a href="#/decoding" class="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Coba Decoding
            </a>
          </div>
        </div>
      </header>

      <!-- What is LSBM Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Apa itu LSB Matching?</h2>
            <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/2">
              <img src="https://www.researchgate.net/publication/334390058/figure/fig1/AS:779960419749888@1562929663101/LSB-Matching-Revisited-LSBR-and-LSB-Matching-in-color-images.png" 
                   alt="LSBM Diagram" 
                   class="rounded-lg shadow-lg w-full">
            </div>
            <div class="md:w-1/2">
              <p class="text-lg mb-4">
                <strong>LSB Matching (LSBM)</strong> adalah pengembangan dari teknik steganografi LSB tradisional yang lebih aman terhadap analisis statistik.
              </p>
              <p class="mb-4">
                Berbeda dengan LSB biasa yang hanya mengganti bit terakhir, LSBM secara acak menambah atau mengurangi nilai pixel sebanyak 1 jika pesan yang akan disembunyikan tidak cocok dengan LSB pixel tersebut.
              </p>
              <p>
                Teknik ini membuat distribusi nilai pixel tetap alami, sehingga lebih sulit dideteksi oleh steganalisis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Bagaimana LSBM Bekerja?</h2>
            <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Step 1 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="text-blue-600 text-4xl font-bold mb-4">1</div>
              <h3 class="text-xl font-semibold mb-3">Pemilihan Pixel</h3>
              <p>Sistem memilih pixel-pixel dalam gambar secara acak atau berurutan untuk menyimpan data rahasia.</p>
            </div>
            
            <!-- Step 2 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="text-blue-600 text-4xl font-bold mb-4">2</div>
              <h3 class="text-xl font-semibold mb-3">Proses Matching</h3>
              <p>Jika bit pesan tidak cocok dengan LSB pixel, nilai pixel diubah ±1 secara acak (bukan hanya di-set seperti LSB biasa).</p>
            </div>
            
            <!-- Step 3 -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="text-blue-600 text-4xl font-bold mb-4">3</div>
              <h3 class="text-xl font-semibold mb-3">Ekstraksi Data</h3>
              <p>Penerima pesan membaca LSB dari pixel yang telah ditentukan untuk mendapatkan pesan asli.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison Section -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Perbedaan LSBM dan LSB Biasa</h2>
            <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead>
                <tr class="bg-gray-100">
                  <th class="py-3 px-4 border-b text-left">Aspek</th>
                  <th class="py-3 px-4 border-b text-left">LSB Biasa</th>
                  <th class="py-3 px-4 border-b text-left">LSB Matching</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b">Perubahan Pixel</td>
                  <td class="py-3 px-4 border-b">Hanya mengganti bit terakhir</td>
                  <td class="py-3 px-4 border-b">Menambah/mengurangi nilai pixel ±1</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b">Deteksi</td>
                  <td class="py-3 px-4 border-b">Mudah terdeteksi analisis statistik</td>
                  <td class="py-3 px-4 border-b">Lebih sulit dideteksi</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b">Kapasitas</td>
                  <td class="py-3 px-4 border-b">Sama (1 bit per pixel)</td>
                  <td class="py-3 px-4 border-b">Sama (1 bit per pixel)</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b">Kualitas Gambar</td>
                  <td class="py-3 px-4 border-b">Perubahan minimal</td>
                  <td class="py-3 px-4 border-b">Perubahan sedikit lebih besar tapi tetap tak terlihat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Keunggulan Aplikasi Kami</h2>
            <div class="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Enkripsi Tambahan</h3>
                <p>Pesan dienkripsi sebelum disisipkan ke gambar untuk keamanan berlapis.</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Keamanan Tinggi</h3>
                <p>Mengimplementasikan LSBM yang lebih tahan terhadap steganalisis dibanding LSB biasa.</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Dukungan Format Gambar</h3>
                <p>Mendukung format PNG dan BMP yang cocok untuk steganografi.</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Perubahan Tak Terlihat</h3>
                <p>Perubahan pada gambar tidak terlihat oleh mata manusia.</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Pengaturan Fleksibel</h3>
                <p>Dapat memilih jumlah bit yang digunakan untuk menyembunyikan pesan.</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div class="text-blue-600 mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Antarmuka Sederhana</h3>
                <p>Mudah digunakan dengan antarmuka yang intuitif.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-blue-600 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">Siap Mencoba LSBM Steganography?</h2>
          <p class="text-xl mb-8">Sembunyikan pesan rahasia Anda dalam gambar dengan teknik yang lebih aman</p>
          <div class="flex justify-center gap-4">
            <a href="#/encoding" class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300">
              Mulai Encoding
            </a>
            <a href="#/decoding" class="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Mulai Decoding
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
          <p>&copy; 2023 LSBM Steganography App. All rights reserved.</p>
        </div>
      </footer>
    </div>
    `;
  }

  async afterRender() {
    // You can add any JavaScript interactions here if needed
  }
}

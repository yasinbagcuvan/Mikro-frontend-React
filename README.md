https://mikro-frontend-react-byrs.vercel.app/
# 📦 React Micro-Frontend E-Ticaret Projesi

Bu proje, **Webpack 5 Module Federation** kullanılarak mikro-frontend mimarisi ile geliştirilmiş bir e-ticaret uygulamasıdır.  
Proje iki ana uygulamadan oluşur:

- **Host App (host1)** → Ürün listeleme, detay sayfası, sepet ekleme ve Auth0 ile kimlik doğrulama.
- **Basket Remote App (basket-remote1)** → Sepet bileşeni (basket) uzaktan yüklenir ve host uygulamada kullanılır.

## 🚀 Teknolojiler
- **React 19**  
- **TypeScript**  
- **Webpack 5 + Module Federation**  
- **Redux Toolkit** & **React Redux**  
- **Ant Design (UI)**  
- **react-hot-toast** (Bildirimler)  
- **Auth0** (Kimlik doğrulama)  
- **Axios** (API istekleri)  

---

## 📂 Proje Yapısı
<img width="307" height="324" alt="micro" src="https://github.com/user-attachments/assets/7c94e86a-72a7-4e11-85ac-8fea96a59b37" />


## ⚙️ Kurulum
### 1. Repoyu Klonla
```bash
git clone https://github.com/yasinbagcuvan/react-micro-frontend.git
cd react-micro-frontend
```

2. Host ve Remote Bağımlılıklarını Kur
 # Host App
cd apps/host1
npm install

# Basket Remote App
cd ../basket-remote1
npm install

▶️ Çalıştırma
İki uygulamayı ayrı terminallerde başlatın:

# Terminal 1: Host App
cd apps/host1
npm start

# Terminal 2: Basket Remote App
cd apps/basket-remote1
npm start


## 🛠️ Özellikler
- Ürün listeleme  
- Ürün detay sayfası  
- Sepete ürün ekleme & kaldırma  
- **react-hot-toast** ile bildirimler  
- **Auth0** ile giriş/çıkış  
- Module Federation ile remote basket bileşeni  
- **Ant Design** ile responsive tasarım  

---

## 📌 Geliştirme Notları
- Module Federation ile `basket-remote1`'deki **Basket** bileşeni `host1` içinde kullanılabilir.  
- Ortak bağımlılıklar (`react`, `react-dom`, `react-redux`, `@reduxjs/toolkit`) Webpack config içinde **shared** olarak tanımlanmıştır.  
- Ürün verileri **FakeStore API**’den çekilmektedir.  


<img width="1903" height="951" alt="micro1" src="https://github.com/user-attachments/assets/56fc5409-0ccd-4094-8b8b-3f04758d0c78" />
<img width="1898" height="955" alt="micro4" src="https://github.com/user-attachments/assets/4317e786-2879-4165-96ab-4c3040ce7247" />
<img width="1918" height="954" alt="micro3" src="https://github.com/user-attachments/assets/3ff73991-cfb8-446f-801f-87a6d32d0a15" />
<img width="1896" height="469" alt="micro2" src="https://github.com/user-attachments/assets/b45d99f5-d343-4443-86ca-e2c93f41f277" />
<img width="495" height="783" alt="micro5" src="https://github.com/user-attachments/assets/0a0a7b0f-c868-496a-a109-7bcd97840d20" />


# Kart Yönetim Uygulaması

Bu proje, kartların oluşturulması, düzenlenmesi, listelenmesi ve silinmesi işlemlerini gerçekleştiren bir web uygulamasıdır. Uygulama, .NET Core Web API backend ve Angular frontend kullanılarak geliştirilmiştir.

## İçindekiler

- [Gereksinimler](#gereksinimler)
- [Backend Kurulumu](#backend-kurulumu)
- [Frontend Kurulumu](#frontend-kurulumu)
- [Uygulama Özellikleri](#uygulama-özellikleri)

## Gereksinimler

### Backend için:
- .NET 8.0 SDK
- Visual Studio 2022 veya Visual Studio Code
- PostgreSQL

### Frontend için:
- Node.js (v18 veya üzeri)
- npm (v9 veya üzeri)
- Angular CLI (v17 veya üzeri)

## Backend Kurulumu

1. Projeyi klonlayın veya indirin.
2. `DemoProject/Backend/DemoProject.API` dizinine gidin.
3. PostgreSQL veritabanınızı oluşturun ve bağlantı bilgilerini `appsettings.json` dosyasında güncelleyin.
4. Veritabanını oluşturmak için aşağıdaki komutları çalıştırın:

```bash
dotnet ef database update
```

5. Uygulamayı başlatmak için:

```bash
dotnet run
```

veya Visual Studio'da projeyi açıp F5 tuşuna basarak çalıştırabilirsiniz.

Backend API varsayılan olarak `http://localhost:5290` adresinde çalışacaktır.

## Frontend Kurulumu

1. `DemoProject/Frontend/demo-app` dizinine gidin.
2. Bağımlılıkları yüklemek için:

```bash
npm install
```

3. Uygulamayı başlatmak için:

```bash
ng serve
```

Frontend uygulama varsayılan olarak `http://localhost:4200` adresinde çalışacaktır.

## Uygulama Özellikleri

### Backend API Endpointleri:

- `GET /api/cards`: Tüm kartları listeler
- `GET /api/cards/{id}`: Belirli bir kartın detaylarını getirir
- `POST /api/cards`: Yeni bir kart oluşturur
- `PUT /api/cards/{id}`: Mevcut bir kartı günceller
- `DELETE /api/cards/{id}`: Bir kartı siler

### Frontend Özellikleri:

- Kartların listelenmesi
- Yeni kart ekleme
- Mevcut kartları düzenleme
- Kartları silme
- Kullanıcı dostu arayüz
- Duyarlı (responsive) tasarım

## Notlar

- Backend API'nin çalışır durumda olduğundan emin olun, aksi takdirde frontend uygulama veri alamayacaktır.
- Veritabanı bağlantı ayarları `appsettings.json` dosyasında bulunmaktadır. Varsayılan bağlantı bilgileri:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=DemoProjectDb;Username=postgres;Password=toor"
  }
  ```
- Frontend uygulaması, API URL'sini `src/app/api.service.ts` dosyasında tanımlamaktadır. Eğer backend farklı bir portta çalışıyorsa, bu dosyayı güncellemeniz gerekebilir.

## Sorun Giderme

- Eğer backend API çalışmıyorsa, veritabanı bağlantısını ve migration'ların uygulandığından emin olun.
- PostgreSQL'in çalışır durumda olduğundan ve bağlantı bilgilerinin doğru olduğundan emin olun.
- Frontend uygulaması API'ye bağlanamıyorsa, CORS ayarlarının doğru yapılandırıldığından emin olun.
- Node.js ve Angular CLI sürümlerinin güncel olduğundan emin olun. 
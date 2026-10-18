# TaskFlow

Görev oluşturma, listeleme, güncelleme ve silme işlemleri için Node.js ve Express ile geliştirilen bir REST API. Görevler ve kullanıcılar JSON dosyalarında saklanır.

## Kurulum

Bilgisayarında Node.js kurulu olmalı. Proje Node.js 24 ile kontrol edildi.

```bash
git clone https://github.com/berkaykyb/tnc_taskflow.git
cd tnc_taskflow
npm ci
npm start
```

Sunucu adresi: `http://localhost:3000`

Geliştirirken `npm run dev` komutu da kullanılabilir.

## Kullanım

Postman'de aşağıdaki adreslere istek gönderilebilir:

Hazır istekler için [Postman koleksiyonunu](docs/postman/TaskFlow.postman_collection.json) **Import** ile içeri aktar. Görevler, Kullanıcılar, Filtreleme ve Arama, Hata Kontrolleri klasörleri bulunur. Her klasörde istekleri yukarıdan aşağı çalıştır; eklenen kaydın kimliği sonraki isteklere otomatik aktarılır. Sunucu farklı bir adreste çalışıyorsa koleksiyonun `baseUrl` değişkenini düzenle.

| İşlem | Adres | Açıklama |
| --- | --- | --- |
| POST | `/tasks` | Görev ekle |
| GET | `/tasks` | Görevleri listele |
| GET | `/tasks/:id` | Görev detayını getir |
| PATCH veya PUT | `/tasks/:id` | Görevi güncelle |
| DELETE | `/tasks/:id` | Görevi sil |

Görev eklerken Body bölümünde **raw / JSON** seçip şu örnek kullanılabilir:

```json
{
  "title": "API testlerini tamamla",
  "description": "Görev uçlarını Postman ile kontrol et.",
  "status": "todo",
  "priority": "high",
  "assigneeId": 1
}
```

Durumlar: `todo`, `in-progress`, `done`. Öncelikler: `low`, `medium`, `high`.

Listeleme varsayılan olarak 10 kayıt döndürür. Örnek filtre: `/tasks?status=todo&priority=high&page=1&limit=10`. Sıralama için `sort=createdAt` veya `sort=dueDate` ve `order=asc` veya `order=desc` kullanılabilir. Arama adresi: `/tasks/search?keyword=api`.

Kullanıcı işlemleri `/users` ve `/users/:id` adreslerinde aynı HTTP yöntemleriyle yapılır. Kullanıcı eklemek için `name` ve `email` alanları gönderilir. Kullanıcı silinince ona atanmış görevlerin `assigneeId` alanı `null` olur.

Veriler `src/data/tasks.json` ve `src/data/users.json` içinde tutulur. Logger her isteğin zamanını, HTTP yöntemini ve adresini terminale yazar.

## Teslim belgeleri

- [Proje tanıtımı](docs/TaskFlow_Proje_Tanitimi.pdf)
- [Postman test ekran görüntüleri](docs/postman/)

TNC Software Persona Backend Geliştirme Projesi kapsamında hazırlandı.

---
description: Adım adım özellik geliştirme — keşfet, planla, uygula, gözden geçir
argument-hint: Özellik açıklaması (isteğe bağlı)
---

# Özellik Geliştirme

Yeni bir özelliği sistematik şekilde uygula: kodu anla, eksik detayları sor, mimariyi tasarla, sonra uygula.

## Temel İlkeler

- **Önce sor**: Belirsizlikleri, edge case'leri ve eksik detayları belirle. Varsayım yapma, sor.
- **Önce anla, sonra uygula**: Mevcut kod kalıplarını önce oku ve kavra.
- **Basit ve zarif**: Okunabilir, bakımı kolay, mimari açıdan sağlam kod yaz.
- **TodoWrite kullan**: Tüm aşamalarda ilerlemeyi takip et.

---

## Aşama 1: Keşif

**Amaç**: Ne yapılacağını anla

İlk istek: $ARGUMENTS

**Adımlar**:
1. Tüm aşamalarla todo listesi oluştur
2. Özellik belirsizse kullanıcıya sor:
   - Hangi problemi çözüyoruz?
   - Özellik tam olarak ne yapmalı?
   - Kısıtlamalar veya gereksinimler var mı?
3. Anladıklarını özetle ve kullanıcıya onayla

---

## Aşama 2: Kod Keşfi

**Amaç**: İlgili mevcut kodu ve kalıpları anla

**Adımlar**:
1. 2-3 paralel Explore agent'ı başlat. Her biri:
   - Kodun farklı bir yönüne odaklansın (benzer özellikler, mimari, UX vb.)
   - 5-10 önemli dosya listesi döndürsün
2. Agent'ların belirlediği dosyaları oku
3. Bulgular ve kalıpların kapsamlı özetini sun

---

## Aşama 3: Açıklayıcı Sorular

**Amaç**: Tasarıma geçmeden önce tüm belirsizlikleri gider

**KRİTİK**: Bu aşamayı atlatma.

**Adımlar**:
1. Kod bulgularını ve orijinal isteği gözden geçir
2. Belirsiz yönleri belirle: edge case'ler, hata işleme, entegrasyon noktaları
3. **Tüm soruları kullanıcıya net bir liste olarak sun**
4. **Cevapları almadan mimari tasarıma geçme**

---

## Aşama 4: Mimari Tasarım

**Amaç**: Farklı trade-off'larla çoklu uygulama yaklaşımı tasarla

**Adımlar**:
1. Farklı odaklarla 2-3 yaklaşım sun: minimal değişiklik, temiz mimari, pragmatik denge
2. Tercih ettiğin yaklaşımı gerekçeyle belirt
3. **Kullanıcıya hangi yaklaşımı tercih ettiğini sor**

---

## Aşama 5: Uygulama

**Amaç**: Özelliği inşa et

**KULLANICI ONAYLAMADAN BAŞLAMA**

**Adımlar**:
1. Açık kullanıcı onayı bekle
2. Önceki aşamalarda belirlenen tüm dosyaları oku
3. Seçilen mimariyi uygula
4. Kod tabanı kurallarına sıkı sıkıya uy
5. Todo'ları ilerledikçe güncelle

---

## Aşama 6: Kalite Gözden Geçirme

**Amaç**: Kodun basit, DRY, zarif ve işlevsel olduğundan emin ol

**Adımlar**:
1. 3 paralel code-reviewer agent'ı başlat: basitlik/DRY, bug/doğruluk, proje kuralları
2. Bulguları konsolide et, önerilen düzeltmeleri sun
3. **Kullanıcıya ne yapmak istediğini sor** (şimdi düzelt, sonra düzelt, devam et)

---

## Aşama 7: Özet

**Amaç**: Yapılanları belgele

**Adımlar**:
1. Tüm todo'ları tamamlandı olarak işaretle
2. Özetle: ne yapıldı, alınan kararlar, değiştirilen dosyalar, önerilen sonraki adımlar

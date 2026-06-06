---
allowed-tools: Bash(gh pr view:*), Bash(gh pr diff:*), Bash(gh pr list:*), Bash(gh pr comment:*)
description: Bir pull request'i code review yap
argument-hint: PR numarası veya URL
---

Verilen pull request için kapsamlı bir code review yap.

$ARGUMENTS

## Adımlar

1. PR'ı görüntüle: `gh pr view $ARGUMENTS` ve `gh pr diff $ARGUMENTS`
2. PR kapalıysa, draft'sa veya zaten yorum yaptıysan dur.
3. Değişiklikleri analiz et:
   - **Bug'lar**: Açık mantık hataları, yanlış sonuç üretecek kod
   - **Güvenlik**: Injection, XSS, SQL injection, OWASP Top 10
   - **Tip hataları**: Derleme veya parse hataları
   - **Kırılan değişiklikler**: API veya davranış değişiklikleri

4. **Sadece YÜKSEK SİNYALLİ sorunları** bildir:
   - Kesinlikle yanlış sonuç üretecek kod
   - Açık güvenlik açıkları
   - Derleme/tip hataları

   Bildirme: kod stili, potansiyel sorunlar (belirli input'a bağlı), subjektif öneriler

5. Terminalde bulgularını sun:
   - Sorun bulunamadıysa: "Sorun bulunamadı. Bug'lar ve güvenlik kontrol edildi."
   - Sorun bulunduysa: her sorunu kısa açıklamayla listele

6. `--comment` argümanı verilmişse `gh pr comment` ile GitHub'a yorum bırak.

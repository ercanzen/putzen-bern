---
allowed-tools: Bash(git checkout:*), Bash(git add:*), Bash(git status:*), Bash(git push:*), Bash(git commit:*), Bash(git log:*), Bash(git diff:*), Bash(git branch:*), Bash(gh pr create:*)
description: Commit yap, push et ve Pull Request aç
---

## Bağlam

- Mevcut git durumu: !`git status`
- Staged ve unstaged değişiklikler: !`git diff HEAD`
- Mevcut branch: !`git branch --show-current`

## Görev

Yukarıdaki değişikliklere bakarak şunları yap:
1. Eğer main/master branch'indeysen yeni bir branch oluştur
2. Uygun bir mesajla tek commit oluştur
3. Branch'i origin'e push et
4. `gh pr create` ile pull request aç

Hepsini tek bir mesajda yap. Başka araç veya metin kullanma.

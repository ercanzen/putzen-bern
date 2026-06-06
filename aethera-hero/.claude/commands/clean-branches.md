---
allowed-tools: Bash(git branch:*), Bash(git worktree:*)
description: Remote'ta silinmiş [gone] local branch'leri temizle
---

## Görev

Remote'ta silinmiş ama hâlâ local'de duran branch'leri temizle.

## Adımlar

1. Branch'leri listele ve [gone] olanları tespit et:
   ```
   git branch -v
   ```
   Not: `+` önekli branch'lerin worktree'si var, önce onu kaldırman gerekir.

2. Worktree listesini kontrol et:
   ```
   git worktree list
   ```

3. [gone] branch'lerin worktree'lerini kaldır, sonra branch'leri sil.

4. Hangi branch'lerin silindiğini veya temizlenecek hiçbir şey yoksa bunu rapor et.

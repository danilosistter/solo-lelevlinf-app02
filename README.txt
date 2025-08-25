# Solo Leveling Panel (PWA + Firebase)

## Passos rápidos
1) Edite `firebase.js` e cole suas credenciais do Firebase (`firebaseConfig`).
2) No Firebase, ative **Authentication → Google** e **Firestore**.
3) Publique as regras:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
4) Sirva localmente (Live Server / `npx serve`) e teste login + progresso.
5) Publique na Vercel e adicione o domínio em **Auth → Authorized domains**.

Boa caçada, Hunter ⚔️

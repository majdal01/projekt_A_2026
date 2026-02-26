Individuel opgave på 2. semester PBA i webudvikling.
Projektperiode fra d. 23. februar 2026 kl. 8:20 til 26. februar 2026 kl. 12 inklusiv kickoff. 
Præsentation den 27. februar 2026.

Projektet løser følgende opgavebeskrivelser:

Vue.js:
4. Lav en generisk komponent der har header-slot, body-slot og footer-slot. Brug den til mindst 3 forskellige visninger med forskelligt indhold (fx "login", "logout", "profil", "sikkerhedstips", "status").

Datasikkerhed:
1. Byg et login-system hvor passwords er sikkert hashede og saltede, og kun brugere med korrekt rolle kan få adgang til visse sider, fx kun admins til systemopsætning. Implementér mindst tre forskellige roller, fx admin, brugere med skrive-/ændringsrettigheder og brugere kun med læserettigheder.

Server startes med node server.js
Client startes med npm run dev

Login kan testes med følgende brugere:
 
        "username": "Sofie",
        "password": "derer20fårpåmarken", 
        "role": "admin"

        "username": "Mads",
        "password": "5fiskihavetsvømmer", 
        "role": "editor"

        "username": "Karen",
        "password": "jegser10fuglepåtaget",
        "role": "viewer"

Det er også muligt at oprette ny bruger. Nye brugere bliver som default tildelt rollen "viewer". Så hvis man ønsker at se løsningen som admin, skal man logge ind som Sofie.

Løsningen er stadig ikke optimal og der er mangler i forhold til UX med mere.
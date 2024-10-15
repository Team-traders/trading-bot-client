# TradingBot

Ce projet adopte une **Clean Architecture** pour assurer la maintenabilité et l'évolutivité. L'architecture est divisée en couches :

### 1. Couche de Présentation
- **componenets** : Composants UI stateless responsables de l'affichage.
- **containers** : Gèrent la récupération des données et les passent aux composants.
- **routes** : Gèrent le routage de l'application.

### 2. Couche Applicative
- **services** : Gèrent la logique métier et les interactions API.
- **userCases** : Définissent les actions spécifiques de l'application.

### 3. Couche Domaine
- **entities** : Objets métier principaux 
- **repositories**
- **interfaces** : Définissent les contrats entre les couches.

### 4. Couche Infrastructure
- **API** : Implémentent les interactions avec les API externes.
- **adapters** : Adapter les données externes au format de l'app.

### Structure du projet :

```
src/
├── application/
├── domain/
├── infrastructure/
├── presentation/
└── assets/
```




## maquette 

## Dashboard

<img width="848" alt="Capture d’écran 2024-10-15 à 14 33 17" src="https://github.com/user-attachments/assets/3101964f-4304-4296-8c53-55d0c3d2d3ca">

## Connect wallet

<img width="844" alt="Capture d’écran 2024-10-15 à 14 34 26" src="https://github.com/user-attachments/assets/24722ec1-92d8-4652-aa13-c11173716812">

## Orders
<img width="457" alt="Capture d’écran 2024-10-15 à 14 35 29" src="https://github.com/user-attachments/assets/740c7034-a09a-4c6c-8b09-f4a67ca270ba">

## History
<img width="457" alt="Capture d’écran 2024-10-15 à 14 35 48" src="https://github.com/user-attachments/assets/a8c1f448-d631-4fba-bef1-658584822a39">

## Settings
<img width="456" alt="Capture d’écran 2024-10-15 à 14 37 35" src="https://github.com/user-attachments/assets/86248b50-529d-43bb-95e2-f5251f08dd94">

## Navbar (wallet)
<img width="153" alt="Capture d’écran 2024-10-15 à 14 38 49" src="https://github.com/user-attachments/assets/faa15de9-2a95-4e25-813e-f10cb2133754">

## Navbar (invit)
<img width="150" alt="Capture d’écran 2024-10-15 à 14 42 08" src="https://github.com/user-attachments/assets/7e6c421c-90f0-415e-b836-ce76c32531f4">


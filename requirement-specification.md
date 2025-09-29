# Kravspecifikation

## 📚 Indholdsfortegnelse

- [Kravspecifikation](#kravspecifikation)
  - [📚 Indholdsfortegnelse](#-indholdsfortegnelse)
  - [ℹ️ Beskrivelse](#ℹ️-beskrivelse)
  - [⚠️ Krav](#️-krav)
    - [🏫 Kodesprog](#-kodesprog)
    - [💾 Database](#-database)
    - [🔨 Framework](#-framework)
    - [📡 Services](#-services)
  - [✨ Funktioner](#-funktioner)
    - [🔑 Authentication](#-authentication)
    - [🔓 Authorization](#-authorization)
  - [📌 Endpoints](#-endpoints)
  - [📂 Indexering](#-indexering)
  - [🔭 Søge parameter](#-søge-parameter)

## ℹ️ Beskrivelse

Der vil blive udviklet et API, til at kunne håndtere firmaets morgenmadsprodukter.

Dette bliver bygget udfra casebeskrivelsen [her](case-description.md).

Der er blevet givet en uge til dette projekt.

## ⚠️ Krav

### 🏫 Kodesprog

Der vil blive brugt Typescript, som det hovedsagelige kodesprog.

Der vil blive brugt JSON til at håndtere data overførelse på API'et.

### 💾 Database

Der vil blive brugt MySQL til database protocol.

### 🔨 Framework

Der vil blive brugt Next.js som Framework.

### 📡 Services

Der vil blive brugt Permit.io til håndtering af rettigheder.

## ✨ Funktioner

### 🔑 Authentication

- Der vil bruges en Bear-token til at validere hvem der efterspørger en resource
- Der vil bruges Brugernavn og adgangskode til at kunne få en Authentication token
- Brugernavn og adgangskode skal sendes som JSON med en POST request

### 🔓 Authorization

- En bruger vil valideres med hjælp af en Authentication token
- Bruger og Endpoint oplysninger vil blive sendt til Permit.io for validering
- Permit.io vil return med resultat om brugeren har adgang til Endpoint

## 📌 Endpoints

| URI | Type | Authorization | Authentication | Indexering | Søgebar | Beskrivelse |
| :- | :-: | :-: | :-: | :-: | :-: | :- |
| /product/cereal/[ID] | GET | 🔲 | 🔲 | 🔲 | 🔲 | Få et morgenmadsprodukt. |
| /product/cereal | GET | 🔲 | 🔲 | ✅ | ✅ | Få en liste af morgenmadsprodukter. |
| /product/cereal | POST | ✅ | ✅ | 🔲 | 🔲 | Lav et nyt morgenmadsprodukt. |
| /product/cereal/[ID] | PATCH | ✅ | ✅ | 🔲 | 🔲 | Ændre et morgenmadsprodukt. |
| /product/cereal/[ID] | DELETE | ✅ | ✅ | 🔲 | 🔲 | Fjern et morgenmadsprodukt. |
| /user/[ID] | GET | 🔲 | ✅ | 🔲 | 🔲 | Få en bruger |
| /user | GET | 🔲 | ✅ | ✅ | 🔲 | Få en liste af bruger. |
| /user | POST | ✅ | ✅ | 🔲 | 🔲 | Lav en ny bruger. |
| /user/[ID] | PATCH | ✅ | ✅ | 🔲 | 🔲 | Ændre en bruger. |
| /user/[ID] | DELETE | ✅ | ✅ | 🔲 | 🔲 | Fjern en bruger. |
| /auth/token | POST | 🔲 | 🔲 | 🔲 | 🔲 | Få en Authentication token |

## 📂 Indexering

| Query | = | >= | <= | > | < | != | Beskrivelse |
| :- | :-: | :-: | :-: | :-: | :-: | :-: | :- |
| page | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | Vis siden med den givende nummer. |
| count | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | Antal elementer på siden. |

## 🔭 Søge parameter

| Query | = | >= | <= | > | < | != | Beskrivelse |
| :- | :-: | :-: | :-: | :-: | :-: | :-: | :- |
| name | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | ✅ | Navn på morgenmadsproduktet. |
| mfr | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | ✅ | A = American Home Food Products <br> G = General Mills <br> K = Kelloggs <br> N = Nabisco <br> P = Post <br> Q = Quaker Oats <br> R = Ralston Purina |
| type | ✅ | 🔲 | 🔲 | 🔲 | 🔲 | ✅ | C = Cold <br> H = Hot |
| calories | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Kalorier pr. portion |
| protein | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Gram protein pr. portion |
| fat | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Gram fedt pr. portion |
| sodium | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Milligram natrium pr. portion |
| fiber | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Gram kostfibre pr. portion |
| carbo | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Gram kulhydrater pr. portion |
| sugars | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Gram sukker pr. portion |
| potass | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Milligram kalium pr. portion |
| vitamins | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Vitaminindhold (0, 25 eller 100 %) <br> Indikerer den typiske procentuelle FDA-anbefaling. |
| shelf | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Placering på hylde (1, 2, 3, tælles fra gulvet) |
| weight | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Vægt i ounces pr. portion |
| cups | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Antal kopper pr. portion |
| rating | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Bedømmelse af produktet |
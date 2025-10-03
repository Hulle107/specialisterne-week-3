# Specialisterne Uge 2

![Version](https://img.shields.io/github/package-json/v/Hulle107/specialisterne-week-2?style=for-the-badge)
![License](https://img.shields.io/github/license/Hulle107/specialisterne-week-2?style=for-the-badge)

## 📚 Indholdsfortegnelse

- [Specialisterne Uge 2](#specialisterne-uge-2)
  - [📚 Indholdsfortegnelse](#-indholdsfortegnelse)
  - [ℹ️ Beskrivelse](#ℹ️-beskrivelse)
  - [🚥 Start](#-start)
    - [🔍 Afhængigheder](#-afhængigheder)
    - [💾 Installering](#-installering)
    - [🔧 Tilføj environment fil](#-tilføj-environment-fil)
    - [🏃 Kør program](#-kør-program)
  - [🔄 Version historie](#-version-historie)
  - [📝 Noter](#-noter)

## ℹ️ Beskrivelse

Læs casebeskrivelsen [her](case-description.md).

Læs kravspecifikation [her](requirement-specification.md).

## 🚥 Start

### 🔍 Afhængigheder

- Node.js 18.18 eller nyere. ([link](https://nodejs.org))
- Internetforbindelse
- Permit.io ([link](https://permit.io))
- MySQL Server

### 💾 Installering

```shell
# Downloader & installere alle nødvendige filer
npm install -y
```

```shell
# Bygger applikationen
npm run build
```

Kør denne [SQL fil](database-creation.sql) på MySQL serveren, for at opsætte denne.

### 🔧 Tilføj environment fil

Lav en fil ved navn `.env` i rodmappen.

```ini
MYSQL_HOST=[mysql-host]
MYSQL_USER=[mysql-bruger]
MYSQL_PASS=[mysql-kodeord]
MYSQL_NAME=[mysql-database-navn]

PERMIT_PDP=[permit-pdp-host]
PERMIT_TOKEN=[permit-token]

JWT_SECRET=[hemmelig-kode]
```

Udfyld alle felter med de nødvændige oplysninger.

### 🏃 Kør program

```shell
# Starter applikationen
npm run start
```

## 🔄 Version historie

Ingen historie endnu.

## 📝 Noter

Ingen noter endnu.
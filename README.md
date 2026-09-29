<div align="center">

# FoodieFlow — Recipe Manager

**A responsive recipe app to browse, favourite, and manage your own recipes — with AI that fills in the details for you.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)

</div>

## Features

- **Browse recipes** — cards with prep time, servings, calories, and difficulty.
- **Recipe details** — a dedicated page for each recipe (`/recipe/:id`).
- **Favourites** — save recipes you love and find them on one page.
- **My Food** — create, edit, and delete your own recipes.
- **AI-assisted entry** — describe a dish and Gemini suggests its time, servings, calories, and difficulty.
- **Responsive** — works across mobile, tablet, and desktop.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router 7 |
| State | React Context |
| AI | Google Gemini (`@google/genai`) |
| Icons | lucide-react |

## Getting Started

```bash
git clone https://github.com/Hashim0011/foodie-flow.git
cd foodie-flow
npm install
cp .env.example .env    # add your Gemini API key
npm run dev             # http://localhost:3000
```

The app works without a key; only the AI suggestions are disabled.

## Routes

| Route | Page |
| --- | --- |
| `/` | All recipes |
| `/recipe/:id` | Recipe details |
| `/favorites` | Favourite recipes |
| `/my-food` | Your recipes (add / edit / delete) |

## Author

**Hashim Al Masaabi** — [GitHub](https://github.com/Hashim0011) · [LinkedIn](https://www.linkedin.com/in/hashim-almasaabi-b51ba4353/)

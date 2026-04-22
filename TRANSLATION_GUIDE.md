# Translation Guide

This project supports multiple languages to make the Mahjong Scoring Trainer accessible to more users. Translations are managed through JSON files and localized markdown help pages.

## Current Languages

- **English** (en) - Default
- **Japanese** (ja)
- **Korean** (ko)
- **Chinese(Simplified)** (zh_cn)

## How to Add or Update Translations

### 1. UI Text Translations

UI text translations are stored in JSON files in `src/i18n/translations/`.

**File structure:**
```
src/i18n/translations/
├── en.json    # English translations
├── ja.json    # Japanese translations
├── ko.json    # Korean translations
└── zh_cn.json # Chinese(Simplified) translations
```

**To add a new language:**

1. Create a new JSON file: `src/i18n/translations/{language-code}.json`
2. Copy the structure from `en.json` and translate all the values
3. Update `src/i18n/I18nContext.js`:
   - Add your language to the `LANGUAGES` object
   - Import your translation file
   - Add it to the `translations` object

**Translation file structure example:**
```json
{
  "common": {
    "yes": "Yes",
    "no": "No",
    "apply": "Apply"
  },
  "buttons": {
    "checkAnswer": "Check Answer",
    "newHand": "New Hand"
  },
  "quiz": {
    "han": "Han",
    "fu": "Fu",
    "points": "Points"
  }
}
```

### 2. Help Page Translations

Help pages are markdown files in `src/helpPages/`.

**File naming convention:**
- `scoring.en.md` - English help page
- `scoring.ja.md` - Japanese help page
- `scoring.{language-code}.md` - New language help page

**To add a translated help page:**

1. Create a new markdown file: `src/helpPages/scoring.{language-code}.md`
2. Translate the content from `scoring.en.md`
3. Keep all tile examples (e.g., `^^234666s45688p567m^^`) unchanged
4. Keep the same heading structure
5. Add a translation note at the top if the page was AI-translated

**Example translation note (in target language):**
```markdown
> **About this translation**: This page has been translated by AI to make it more accessible. If you notice any issues with the translations, please report them on [GitHub](https://github.com/Varantha/Mahjong-ScoringTrainer/).
```

### 3. Using Special Formatting

**Furigana (for Japanese):**

Use HTML `<ruby>` tags to add pronunciation guides:
```markdown
<ruby>三元牌<rt>サンゲンハイ</rt></ruby>
```

This displays as: 三元牌 with サンゲンハイ above it.

## Translation Guidelines

1. **Accuracy**: Ensure technical mahjong terms are translated correctly
2. **Consistency**: Use the same translation for the same term throughout
3. **Completeness**: Translate all content - the translated page should match the English version exactly
4. **Tile Examples**: Keep tile notation unchanged (e.g., `^^234s^^`)
5. **Code/Settings**: Keep code examples and setting names in their original form

## Testing Your Translation

1. Start the development server: `npm run start`
2. Open the language selector in the options menu
3. Select your language
4. Check all UI elements and help pages
5. Verify that tile images and examples display correctly

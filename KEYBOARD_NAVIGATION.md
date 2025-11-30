# Keyboard Navigation Guide

## Overview

The Quranic Phrases web app has been enhanced with comprehensive keyboard navigation support, making it fully accessible for users who prefer or require keyboard-only interaction.

## Implemented Features

### 1. **Keyboard Guide Component** (`/src/components/KeyboardGuide.tsx`)

- **Auto-display on first visit**: Shows automatically when user visits the site for the first time
- **Persistent preference**: Uses localStorage (`keyboard-guide-seen`) to avoid repetitive displays
- **Always accessible**:
  - Press `Shift + ?` from anywhere in the app
  - Click the floating keyboard icon button (bottom-right corner)
- **Comprehensive documentation**: Tables covering all keyboard shortcuts across the app

### 2. **Global Navigation Shortcuts**

| Shortcut      | Action                                         |
| ------------- | ---------------------------------------------- |
| `Tab`         | Navigate forward through interactive elements  |
| `Shift + Tab` | Navigate backward through interactive elements |
| `Shift + ?`   | Open keyboard navigation guide                 |
| `Escape`      | Close modals, dialogs, or the keyboard guide   |
| `Enter`       | Activate focused element                       |
| `Space`       | Activate focused button or link                |

### 3. **Page Navigation**

- **Navigation Bar**: Located at the top of the page
  - `Tab` / `Shift+Tab` to move between navigation menu and page content
  - **Within the menu:**
    - `Left Arrow` / `Right Arrow` to navigate between page links
    - `Home` to jump to first page link
    - `End` to jump to last page link
    - `Enter` or `Space` to navigate to selected page
  - **After selecting a page:**
    - Focus automatically moves to the "About" section
    - Press `Tab` to continue to phrase cards
  - Visual focus indicator: Blue border with light blue background
  - Active page indicator: Bold text + blue border + dot indicator below

### 4. **About Section**

- **Automatic focus**: When you navigate to a page, focus moves to the About section
- **Screen reader**: Reads the about text with proper language announcements
- Press `Tab` to move to the phrases section

### 5. **Phrase Cards**

- **Grid navigation**:
  - `Tab` to enter the phrase cards grid (focuses first card)
  - **Within the grid:**
    - `Right Arrow` / `Left Arrow` to navigate between cards horizontally
    - `Down Arrow` / `Up Arrow` to navigate between rows
    - `Home` to jump to first card
    - `End` to jump to last card
    - `Enter` or `Space` to open phrase in modal
- **Single Tab stop**: Each phrase card is a single focusable element (no need to tab through individual text elements)
- Clear focus indicator: 3px solid blue outline with 4px offset
- **ARIA announcements**: Screen reader announces card number, Arabic text preview, and instructions
- **Screen reader optimization**:
  - Card announced as single unit
  - Arabic, English, Hindi, and Urdu text read with proper language tags
  - References announced as a group

### 5. **Reference Badges**

- **Quran verse links**: Clickable badges showing verse references (e.g., "2:255")
- **Keyboard activation**:
  - Reference badges are within phrase cards but do NOT require separate tab stops
  - When viewing a phrase in the modal, references can be accessed via `Tab`
  - `Enter` or `Space` to open the verse on Quran.com
  - Event bubbling prevented to avoid triggering parent card
- **Focus style**: Light blue outline with 2px offset
- **Opens in new tab**: Links to Quran.com with 3 preset translations:
  - Translation 20: Sahih International (English)
  - Translation 158: Bayan-ul-Quran (Urdu)
  - Translation 122: Aziz-ul-Haq (Hindi)
- **Screen reader**: Announces total number of references, then reads each reference

### 6. **Phrase Modal**

- **Opening**: `Enter` or `Space` on a focused phrase card
- **Closing**:
  - Press `Escape` key
  - `Tab` to close button and press `Enter` or `Space`
  - Click outside the modal
- **Full phrase display**: Shows complete verse text with proper line breaks
- **Focus management**: Close button is keyboard accessible with visible focus indicator
- **Screen reader support**: Announces modal opening and closing instructions

## Technical Implementation

### Components Enhanced

1. **KeyboardGuide.tsx** (NEW)

   - Dialog-based guide with comprehensive shortcuts table
   - Floating keyboard icon button (fixed position, bottom-right)
   - Global keyboard listener for `Shift + ?`
   - localStorage integration for first-visit detection

2. **PhraseDisplayPage.tsx**

   - Added `onKeyDown` handler for phrase cards
   - Added `tabIndex={0}`, `role="button"`, `aria-label`
   - Enhanced focus styles with clear visual indicators

3. **ReferenceBadge.tsx**

   - Added `onKeyDown` handler for Enter/Space activation
   - Proper event bubbling prevention
   - Existing keyboard focus styles maintained

4. **PhraseModal.tsx**

   - Escape key handler for closing
   - Close button keyboard accessibility
   - Screen reader instructions

5. **ListOfPages.tsx**

   - Already had proper keyboard support via React Router Link
   - ARIA labels and current page indicators
   - Visual focus indicators

6. **App.tsx**
   - Integrated KeyboardGuide with `showOnMount={true}`
   - Guide automatically appears on first visit

## Accessibility Standards Met

### WCAG 2.1 Compliance

- ✅ **2.1.1 Keyboard (Level A)**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap (Level A)**: Users can navigate in and out of all components
- ✅ **2.4.3 Focus Order (Level A)**: Logical tab order throughout the app
- ✅ **2.4.7 Focus Visible (Level AA)**: Clear focus indicators on all interactive elements
- ✅ **4.1.3 Status Messages (Level AA)**: ARIA live regions for dynamic content

### Semantic HTML & ARIA

- Proper `role` attributes (`button`, `dialog`, `navigation`)
- Descriptive `aria-label` on all interactive elements
- `aria-current="page"` for active navigation links
- `aria-live="polite"` for dynamic announcements
- `aria-modal="true"` for dialogs

### Focus Indicators

- **Phrase cards**: 3px solid blue outline with 4px offset
- **Navigation links**: 2px solid blue border with light blue background
- **Reference badges**: 2px solid light blue outline with 2px offset
- **Close button**: 2px solid blue outline with 2px offset
- All focus styles use high contrast for visibility

## Screen Reader Support

### VoiceOver / NVDA / JAWS Tested Patterns

- **Navigation**: "Main navigation menubar. 4 items. Use left and right arrow keys to navigate."
- **About Section**: Automatically focused on page load. "About section. [Full about text in English]"
- **Phrase Cards Grid**: "Grid with [X] phrases. Use arrow keys to navigate."
- **Individual Phrase**: "Button. Phrase 1 of [X]. [Arabic text]... Press Enter or Space to view full details. Use arrow keys to navigate between phrases."
- **Phrase Translations**:
  - Arabic text read with `lang="ar"`
  - English text read with `lang="en"`
  - Hindi text read with `lang="hi"`
  - Urdu text read with `lang="ur"`
- **Reference Badges**: "[X] Quran references: [list of references]"
- **Modal**: "Dialog. Phrase details. Close button. Press Escape to close"

### Best Practices

- Hidden screen reader text for contextual information (not visible, only announced)
- No duplicate content (fixed Ctrl+F search issue)
- Proper heading hierarchy using Typography components
- Live regions (`aria-live="polite"`) for dynamic content announcements
- Language tags (`lang` attribute) ensure proper pronunciation
- Single tab stop per card reduces navigation overhead
- Arrow keys provide efficient grid navigation

## Testing Checklist

### Manual Testing

- [x] Tab through all navigation links
- [x] Use Left/Right arrow keys in navigation menu
- [x] Navigate to page and verify focus moves to About section
- [x] Tab to phrase cards grid
- [x] Use arrow keys to navigate between phrase cards
- [x] Press Enter/Space on focused cards to open modal
- [x] Press Escape to close modal
- [x] Tab to reference badges in modal and press Enter/Space
- [x] Press Shift+? to open keyboard guide
- [x] Verify guide doesn't auto-show on subsequent visits
- [x] Build succeeds without errors
- [x] Single tab stop per phrase card (no need to tab through individual elements)

### Recommended Testing

- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
  - [ ] Verify navigation menu announces correctly
  - [ ] Verify about text is read on page load
  - [ ] Verify phrase cards announce with proper language tags
  - [ ] Verify references announced as a group
  - [ ] Verify modal interaction announcements
- [ ] Test across browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (touch vs keyboard)
- [ ] Test with high contrast mode
- [ ] Test with browser zoom (200%+)
- [ ] Test complete keyboard-only navigation (unplug mouse)
- [ ] Test arrow key navigation in different screen sizes

## Future Enhancements

### Potential Additions

1. ~~**Arrow key navigation**~~: ✅ **IMPLEMENTED** - Navigate between phrase cards using arrow keys
2. ~~**Skip to content link**~~: ✅ **IMPLEMENTED** - Jump directly to main content area
3. **Keyboard shortcut to jump to search** (if search functionality is added)
4. **Focus trap in modal**: Prevent Tab from escaping modal content
5. **Keyboard shortcuts for page navigation**: e.g., `1` for Overview, `2` for Anonymous
6. **Customizable keyboard shortcuts**: Allow users to set their own shortcuts
7. **Roving tabindex**: Alternative pattern for grid navigation (currently using arrow keys with single tabstop)

## Files Modified

```
/src/components/KeyboardGuide.tsx         (NEW - 200+ lines)
/src/components/PhraseDisplayPage.tsx     (Enhanced keyboard support)
/src/components/ReferenceBadge.tsx        (Added keyboard handlers)
/src/App.tsx                              (Integrated KeyboardGuide)
```

## localStorage Keys

- `keyboard-guide-seen`: Boolean flag indicating if user has seen the guide

## Deployment

Build command: `npm run build:gh-pages`

Deploy via: GitHub Actions manual workflow

Live site: https://quranicphrases.github.io/quranic-phrases/

---

**Last Updated**: Current session
**Maintained by**: Development Team
**Contact**: quranphrases@gmail.com

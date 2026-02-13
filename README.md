# LifeOS Lite - Personal Milestone Tracker Dashboard

A professional, enterprise-style personal milestone tracking system built with vanilla HTML, CSS, and JavaScript. Track your life phases, development pillars, and weekly progress with a clean, minimal interface.

## 🚀 Features

### Core Modules

1. **Dashboard Overview**
   - Real-time summary of current phase and progress
   - Pillar completion statistics
   - Weekly task completion tracking
   - Clean, card-based layout

2. **Phases Management**
   - Add unlimited custom phases with dates and focus areas
   - Edit existing phases (name, dates, focus)
   - Delete phases with confirmation
   - Three predefined life phases (customizable):
     - Foundation (Feb 2026 – Sep 2026)
     - Thesis Dominance (Sep 2026 – Apr 2027)
     - Career Acceleration (May 2027 onward)
   - Track phase status (Not Started / In Progress / Completed)
   - Visual indicators for active phase
   - Dominant focus tracking per phase

3. **Development Pillars**
   - Add unlimited custom pillars with milestones
   - Edit pillar names and milestone lists
   - Delete pillars with all milestones
   - Four predefined development areas (customizable):
     - Cloud Foundations (5 milestones)
     - Governance & Security (6 milestones)
     - ML Systems (6 milestones)
     - Architecture Thinking (7 milestones)
   - Interactive milestone checklists
   - Automatic progress calculation
   - Visual progress bars
   - Preserved completion status when editing milestones

4. **Weekly Tracker**
   - Add and manage weekly tasks
   - Track completion percentage
   - Dominant focus per week
   - Detailed task view with interactive checkboxes
   - Color-coded completion badges
   - Delete weeks as needed

5. **Settings**
   - Theme customization (Blue, Green, Purple, Teal)
   - Data reset functionality
   - Persistent preferences

### Technical Features

- ✅ **100% Vanilla JavaScript** - No frameworks or libraries required
- 💾 **localStorage Integration** - All data persists automatically
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Theme Support** - Multiple color schemes
- ⚡ **Smooth Animations** - Professional transitions and interactions
- 🔒 **Data Persistence** - Never lose your progress

## 📦 Installation & Setup

### Quick Start

1. **Download the files**
   - Save `index.html`, `styles.css`, and `app.js` in the same directory

2. **Open in browser**
   - Double-click `index.html`, or
   - Right-click → Open with → Your browser, or
   - Serve using a local web server (optional)

### Optional: Using a Local Server

For the best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📖 User Guide

### Getting Started

1. **Dashboard Overview**
   - Upon opening, you'll see your current phase, focus area, and progress
   - The dashboard auto-updates as you make changes

2. **Managing Phases**
   - Navigate to "Phases" from the sidebar
   - **Add New Phase**: Click "Add Phase" button to create custom phases
   - **Edit Phase**: Click "Edit" button on any phase card to modify details
   - **Delete Phase**: Click "Delete" to remove a phase (with confirmation)
   - Click "Start Phase" to mark a phase as in-progress
   - Only one phase can be in-progress at a time
   - Click "Complete Phase" when finished

3. **Tracking Milestones (Pillars)**
   - Navigate to "Pillars" from the sidebar
   - **Add New Pillar**: Click "Add Pillar" to create a custom development area
   - **Edit Pillar**: Click the edit icon (pencil) next to pillar name
   - **Edit Milestones**: When editing a pillar, add/remove/modify milestones (one per line)
   - **Delete Pillar**: Click the trash icon to remove a pillar and all its milestones
   - Click on any milestone to toggle completion
   - Progress bars update automatically
   - Editing preserves completion status for unchanged milestones

4. **Weekly Planning**
   - Navigate to "Weekly Tracker"
   - Click "Add Week" to create a new week
   - Enter week number, focus area, and tasks (one per line)
   - Click the eye icon to view and check off tasks
   - Click the trash icon to delete a week
   - Tasks can be marked complete in the detail view

5. **Customization**
   - Navigate to "Settings"
   - Choose from 4 color themes
   - Reset all data if needed (warning: cannot be undone)

## 🎯 Data Structure

### Phases
```javascript
{
  id: 'foundation',
  name: 'Foundation',
  startDate: 'Feb 2026',
  endDate: 'Sep 2026',
  focus: 'Thesis',
  status: 'in-progress' // 'not-started' | 'in-progress' | 'completed'
}
```

### Pillars
```javascript
{
  id: 'cloud-foundations',
  name: 'Cloud Foundations',
  milestones: [
    {
      id: 'cf1',
      label: 'Complete AWS Solutions Architect certification',
      completed: false
    }
  ]
}
```

### Weeks
```javascript
{
  weekNumber: 1,
  focus: 'Thesis',
  tasks: [
    {
      id: 'task-1234567890-0',
      label: 'Complete chapter 1',
      completed: false
    }
  ]
}
```

## 🎨 Customization

### Creating Your Own Goals

**Phases**: Click "Add Phase" to create custom life phases
- Example: "Language Learning Sprint" (Jan - Mar 2027)
- Example: "Fitness Transformation" (Apr - Sep 2027)

**Pillars**: Click "Add Pillar" to create custom development areas
- Example: "Language Skills" with milestones like "Complete Duolingo Spanish", "Read first novel in Spanish"
- Example: "Health & Fitness" with milestones like "Run 5K under 25 min", "Bench press bodyweight"

**Editing Goals**:
- Use Edit buttons to modify phase names, dates, or focus areas
- Edit pillar names and milestone lists (one per line)
- Completion status is preserved for unchanged milestones
- Delete with confirmation to prevent accidents

### Changing Default Data

Edit `app.js` and modify the `defaultData` object to customize:
- Default phase names and dates
- Default pillar names and milestones
- Default theme

### Adding More Themes

1. Edit `styles.css`
2. Add a new theme block:
```css
body[data-theme="your-theme"] {
    --primary-color: #YourColor;
    --primary-light: #YourLightColor;
    --primary-dark: #YourDarkColor;
}
```
3. Add the theme option in Settings section of `index.html`

### Styling Modifications

All styles are in `styles.css` with clear section comments:
- CSS variables at the top for easy color/spacing changes
- Modular sections for each component
- Responsive breakpoints clearly marked

## 🔧 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- localStorage support
- ES6 JavaScript support
- CSS Grid and Flexbox support

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- **Desktop**: > 1024px (full sidebar, grid layout)
- **Tablet**: 768px - 1024px (narrow sidebar)
- **Mobile**: < 768px (collapsible sidebar, single column)

## 💡 Tips & Best Practices

1. **Regular Updates**: Check off milestones and tasks regularly to track progress
2. **Weekly Planning**: Add weeks in advance to plan ahead
3. **Phase Transitions**: Update phase status when you transition between life stages
4. **Backup**: Export your localStorage data periodically (browser console: `localStorage.getItem('lifeosData')`)
5. **Mobile Use**: Access on mobile for quick task updates on-the-go

## 🐛 Troubleshooting

### Data Not Saving
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify localStorage is not disabled (private browsing may limit it)

### Styles Not Loading
- Ensure all three files are in the same directory
- Check file names match exactly (case-sensitive)
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Reset Not Working
- Clear browser cache
- Manually clear localStorage: `localStorage.removeItem('lifeosData')`

## 📄 File Structure

```
lifeos-lite/
│
├── index.html      # Main HTML structure
├── styles.css      # All styling (variables, components, responsive)
├── app.js          # Application logic and data management
└── README.md       # This file
```

## 🔐 Privacy & Data

- All data is stored locally in your browser's localStorage
- No data is sent to any server
- No analytics or tracking
- Export your data anytime via browser console

## 🚀 Future Enhancements (Ideas)

- Export/Import data as JSON
- Print-friendly views
- Charts and visualizations
- Habit tracking
- Goal setting module
- Calendar integration
- Dark mode
- Drag-and-drop task reordering

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all files are present and correctly named
3. Try in a different browser
4. Clear cache and localStorage

## 📜 License

This is a personal project template. Feel free to use, modify, and distribute as needed.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Author**: LifeOS Lite Development Team

---

## Quick Reference

### Keyboard Shortcuts
- No keyboard shortcuts currently (feature for v2.0)

### Color Themes
- **Blue** (Default): Professional, calm
- **Green**: Growth, nature
- **Purple**: Creative, innovative
- **Teal**: Modern, fresh

### Progress Calculation
- **Pillars**: (Completed Milestones / Total Milestones) × 100
- **Weekly**: (Completed Tasks / Total Tasks) × 100
- **Overall**: Average of all pillar progress

---

**Happy Tracking! 🎯**
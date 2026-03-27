# Image Management Guide

This guide explains how to replace placeholder images with your own images in the MoX website.

## Image Locations

All images are referenced using local paths. The application expects images to be placed in the `public/images` directory.

### Directory Structure

Create the following directory structure in your `public` folder:

```
public/
└── images/
    ├── hero-team.jpg           # Homepage hero section image
    ├── about-office.jpg        # About page office image
    ├── partnership.jpg         # Partnership page image
    ├── events/
    │   ├── event-1.jpg        # Annual Business Summit
    │   ├── event-2.jpg        # Professional Development Workshop
    │   ├── event-3.jpg        # Networking Mixer
    │   ├── event-4.jpg        # Innovation Summit
    │   ├── event-5.jpg        # Winter Gala (past event)
    │   └── event-6.jpg        # Leadership Forum (past event)
    └── team/
        ├── member-1.jpg       # Dr. Sarah Johnson (President)
        ├── member-2.jpg       # Michael Chen (Vice President)
        ├── member-3.jpg       # Emma Rodriguez (Treasurer)
        └── member-4.jpg       # David Okonkwo (Secretary)
```

## Image Requirements

### Recommended Dimensions

- **Hero Images** (`hero-team.jpg`): 1200x900px (4:3 ratio)
- **About Office** (`about-office.jpg`): 1200x900px (4:3 ratio)
- **Partnership** (`partnership.jpg`): 1200x900px (4:3 ratio)
- **Event Images** (`events/event-*.jpg`): 1920x1080px (16:9 ratio)
- **Team Member Photos** (`team/member-*.jpg`): Square images, 800x800px recommended

### File Format

- Supported formats: JPG, PNG, WebP
- JPG is recommended for photographs
- PNG is recommended for images with transparency
- Keep file sizes under 500KB when possible for optimal loading

### Image Quality

- Use high-quality images that represent your organization professionally
- Ensure good lighting and clear subjects
- Avoid overly compressed images that appear pixelated

## How to Replace Images

### Step 1: Prepare Your Images

1. Collect all the images you want to use
2. Resize them to the recommended dimensions
3. Optimize them for web (compress without losing too much quality)
4. Name them according to the structure above

### Step 2: Create the Directory Structure

In your project root, create the directories:

```bash
mkdir -p public/images/events
mkdir -p public/images/team
```

### Step 3: Upload Your Images

Copy your prepared images to the appropriate directories:

- Homepage hero image → `public/images/hero-team.jpg`
- About page office → `public/images/about-office.jpg`
- Partnership image → `public/images/partnership.jpg`
- Event images → `public/images/events/`
- Team photos → `public/images/team/`

### Step 4: Verify the Images

1. Start your development server
2. Visit each page to ensure images load correctly:
   - Home page: Check hero section and featured events
   - About page: Check office image and team member photos
   - Events page: Check all event cards
   - Partnership page: Check partnership image

## Image Attribution

If you're using stock photos or images that require attribution:

1. Keep track of image sources and licenses
2. Add attribution in the `/ATTRIBUTIONS.md` file
3. Ensure compliance with image licenses

## Database Images

Some images are also stored in the Supabase database. If you need to update those:

### Events Table

Update the `image_url` field in the `events` table:

```sql
UPDATE events 
SET image_url = '/images/events/event-1.jpg' 
WHERE id = '1';
```

### Committee Members Table

Update the `image_url` field in the `committee_members` table:

```sql
UPDATE committee_members 
SET image_url = '/images/team/member-1.jpg' 
WHERE id = '1';
```

## Troubleshooting

### Images Not Loading

1. **Check file path**: Ensure the file name matches exactly (case-sensitive on some systems)
2. **Check file location**: Verify files are in the `public/images` directory
3. **Clear cache**: Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check file permissions**: Ensure files are readable

### Images Look Stretched or Distorted

- Check that your images match the recommended aspect ratios
- The application uses `object-cover` which will crop images to fit
- Center important content in your images

### Large File Sizes

If images are loading slowly:

1. Compress images using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/) (Mac)
2. Consider using WebP format for better compression
3. Aim for under 500KB per image

## Logo

The logo placeholder is in the header component. To replace it:

1. Create your logo image (recommended: 48x48px square, PNG with transparency)
2. Save it as `public/images/logo.png`
3. Update `/src/app/components/Header.tsx`:

```tsx
<div className="w-12 h-12 bg-white rounded-md flex items-center justify-center overflow-hidden">
  <img src="/images/logo.png" alt="MoX Logo" className="w-full h-full object-contain p-1" />
</div>
```

## Best Practices

1. **Consistent Style**: Use images with a consistent style and color palette
2. **Professional Quality**: Use high-quality, professional images
3. **Diversity**: Include diverse representation in team and event photos
4. **Relevance**: Ensure images are relevant to the content they accompany
5. **Optimization**: Always optimize images before uploading
6. **Backup**: Keep original high-resolution versions in a separate location

## Additional Resources

- [Web Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Image Format Comparison](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
- [Responsive Images Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

## Support

If you encounter issues with images not appearing:

1. Check the browser console for error messages
2. Verify file paths are correct
3. Ensure images are in the correct format
4. Contact technical support if problems persist

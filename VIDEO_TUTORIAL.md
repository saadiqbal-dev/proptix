# Video Section Tutorial

This guide explains how to work with video sections in the Proptix.ai website, including how to add new videos, optimize them for web performance, and update thumbnails.

## 📁 File Structure

Your videos and images should be placed in these folders:

```
assets/
├── videos/          # Place your MP4 videos here
│   ├── RecoveryRoute.mp4
│   └── your-new-video.mp4
└── img/             # Place your video thumbnails here
    ├── video-thumbnail-img.jpg
    └── your-new-thumbnail.jpg
```

## 🎥 Video Requirements

### Format & Specifications

- **Format**: MP4 (H.264/AVC codec)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 24fps or 30fps
- **Target File Size**: 2-6 MB for hero videos, 4-8 MB for longer content
- **Duration**: 10-30 seconds for hero videos (looping)

### Performance Guidelines

- **Hero Video**: ≤ 4MB for fast loading
- **Content Video**: ≤ 6MB for longer sections
- **Always provide a poster image** to prevent layout shifts

## 🛠️ Video Optimization with HandBrake

### Step 1: Download HandBrake

1. Go to [handbrake.fr](https://handbrake.fr/)
2. Download the latest version for your operating system
3. Install and launch HandBrake

### Step 2: Import Your Video

1. Click **"Open Source"** or drag your video file into HandBrake
2. Select your video file and click **"Open"**

### Step 3: Configure Output Settings

#### For Hero Videos (Short, looping content):

```
Output Settings:
├── Format: MP4
├── Video Codec: H.264 (x264)
├── Framerate: Same as source (or 24fps)
├── Quality: RF 23-25 (good balance)
├── Resolution: 1920x1080 or 1280x720
└── Audio: AAC, 128kbps (or remove if no audio needed)
```

#### For Content Videos (Longer sections):

```
Output Settings:
├── Format: MP4
├── Video Codec: H.264 (x264)
├── Framerate: Same as source
├── Quality: RF 20-22 (higher quality)
├── Resolution: 1920x1080
└── Audio: AAC, 160kbps
```

### Step 4: Advanced Settings (Optional)

#### For Better Compression:

1. Go to **"Video"** tab
2. Click **"Advanced"** button
3. Add these settings:
   ```
   ref=3:bframes=3:subme=7:me=umh:partitions=all
   ```

#### For Faster Encoding:

1. Go to **"Video"** tab
2. Set **"Encoder Preset"** to **"Fast"** or **"Very Fast"**

### Step 5: Start Encoding

1. Choose your output destination
2. Click **"Start Encode"**
3. Wait for completion (time depends on video length and settings)

## 🖼️ Creating Video Thumbnails

### Option 1: Extract from Video

1. **Using VLC Media Player:**

   - Open your video in VLC
   - Pause at desired frame
   - Go to **Media → Take Snapshot**
   - Save as JPG or PNG

2. **Using HandBrake:**
   - In HandBrake, go to **"Preview"** tab
   - Navigate to desired frame
   - Click **"Save Preview"** as JPG

### Option 2: Create Custom Thumbnail

1. Use any image editing software (Photoshop, GIMP, Canva)
2. Create a 1920x1080 or 1280x720 image
3. Save as JPG with 80-85% quality
4. Optimize for web (≤ 200KB)

## 📝 Updating HTML Code

### Step 1: Add Your Files

1. Place your optimized MP4 in `assets/videos/`
2. Place your thumbnail in `assets/img/`

### Step 2: Update HTML

Find the video section you want to update and modify:

```html
<!-- Example: First video section -->
<section class="video-section first-video-section">
  <div class="video-background-container">
    <video
      class="video-background-video"
      autoplay
      muted
      loop
      playsinline
      poster="./assets/img/your-new-thumbnail.jpg"
      preload="metadata"
    >
      <source src="./assets/videos/your-new-video.mp4" type="video/mp4" />
    </video>
  </div>
</section>
```

### Step 3: Update Multiple Video Sections

If you have multiple video sections, update each one:

```html
<!-- Video section with text overlay -->
<section class="video-section video-section-text-overlay">
  <div class="video-background-container">
    <video
      class="video-background-video"
      autoplay
      muted
      loop
      playsinline
      poster="./assets/img/your-overlay-thumbnail.jpg"
      preload="metadata"
    >
      <source src="./assets/videos/your-overlay-video.mp4" type="video/mp4" />
    </video>
    <p>Your overlay text here</p>
  </div>
</section>

<!-- Video section with CTA overlay -->
<section class="video-section video-section-cta-overlay">
  <div class="video-background-container">
    <video
      class="video-background-video"
      autoplay
      muted
      loop
      playsinline
      poster="./assets/img/your-cta-thumbnail.jpg"
      preload="metadata"
    >
      <source src="./assets/videos/your-cta-video.mp4" type="video/mp4" />
    </video>
    <div class="video-section-cta-overlay-content">
      <h2>Your CTA Title</h2>
      <a href="#" class="btn btn-primary">Your CTA Button</a>
    </div>
  </div>
</section>
```

## ⚡ Performance Best Practices

### Video Optimization Checklist

- [ ] File size ≤ 6MB for hero videos
- [ ] File size ≤ 8MB for content videos
- [ ] H.264 codec used
- [ ] Poster image provided
- [ ] `preload="metadata"` attribute set
- [ ] `muted` and `playsinline` attributes for autoplay
- [ ] `loop` attribute for continuous playback

### Loading Optimization

- **Poster images** prevent layout shifts while video loads
- **`preload="metadata"`** loads only video metadata, not the full file
- **Autoplay attributes** ensure videos play on mobile devices
- **Lazy loading** can be implemented for videos below the fold

### Mobile Considerations

- Videos should work on all mobile devices
- Keep file sizes small for slower connections
- Test on various devices and connection speeds
- Consider providing lower resolution versions for mobile

## 🔧 Troubleshooting

### Common Issues

#### Video Won't Play

- Check file format (must be MP4)
- Verify codec (H.264)
- Ensure `muted` attribute is present for autoplay
- Check file path in HTML

#### Video Too Large

- Re-encode with higher RF value (25-28)
- Reduce resolution to 1280x720
- Remove audio if not needed
- Use faster encoder preset

#### Poor Quality

- Lower RF value (18-22)
- Increase resolution to 1920x1080
- Use slower encoder preset for better compression

#### Layout Shifts

- Always provide poster image
- Set correct width/height attributes
- Use `preload="metadata"`

## 📱 Testing Checklist

Before deploying:

- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test on slow connections (3G simulation)
- [ ] Verify autoplay works on mobile
- [ ] Check poster images load correctly
- [ ] Confirm no layout shifts occur
- [ ] Validate file sizes are within limits

## 🎯 Quick Reference

### HandBrake Settings Summary

```
Hero Videos:
├── RF: 23-25
├── Resolution: 1920x1080
├── Target Size: ≤ 4MB
└── Duration: 10-30s

Content Videos:
├── RF: 20-22
├── Resolution: 1920x1080
├── Target Size: ≤ 6MB
└── Duration: 30s+
```

### HTML Template

```html
<video
  class="video-background-video"
  autoplay
  muted
  loop
  playsinline
  poster="./assets/img/your-thumbnail.jpg"
  preload="metadata"
>
  <source src="./assets/videos/your-video.mp4" type="video/mp4" />
</video>
```

---

**Need help?** Check the troubleshooting section above or test your videos on multiple devices before final deployment.

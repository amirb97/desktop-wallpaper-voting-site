async function wallpaperFormHandler(event) {
    event.preventDefault();
  
    const wallpaper_url = document.querySelector('#wallpaper-url').value.trim();
    const title = document.querySelector('#wallpaper-title').value.trim();

  
    if (wallpaper_url && title) {
      const response = await fetch('/api/wallpapers', {
        method: 'POST',
        body: JSON.stringify({
          title,
          wallpaper_url,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
};

document.querySelector('.wallpaper-submit').addEventListener('submit', wallpaperFormHandler);
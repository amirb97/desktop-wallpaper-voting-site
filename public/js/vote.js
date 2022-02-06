async function firstWallpaperWin() {
    let id = picture1.dataset.id;
    let elo_score = parseInt(picture1.dataset.elo_score);
    elo_score += 50;
    const response = await fetch(`/api/wallpapers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            elo_score
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    id = picture2.dataset.id;
    elo_score = parseInt(picture2.dataset.elo_score);
    elo_score -= 50;
    const response2 = await fetch(`/api/wallpapers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            elo_score
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response2.ok) {
        document.location.replace('/vote');
    } else {
        alert(response.statusText);
    }
};

async function secondWallpaperWin() {
    let id = picture2.dataset.id;
    let elo_score = parseInt(picture2.dataset.elo_score);
    elo_score += 50;
    const response = await fetch(`/api/wallpapers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            elo_score
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    id = picture1.dataset.id;
    elo_score = parseInt(picture1.dataset.elo_score);
    elo_score -= 50;
    const response2 = await fetch(`/api/wallpapers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            elo_score
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response2.ok) {
        document.location.replace('/vote');
    } else {
        alert(response.statusText);
    }
};

const picture1 = document.querySelector('#picture1');
picture1.addEventListener('click', firstWallpaperWin);
const picture2 = document.querySelector('#picture2');
picture2.addEventListener('click', secondWallpaperWin);

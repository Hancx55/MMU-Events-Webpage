document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('postBtn');
    const forumFeed = document.getElementById('events');

    if (postBtn) {
        postBtn.onclick = function() {
            const t = document.getElementById('topic').value.trim();
            const d = document.getElementById('details').value.trim();
            const tag = document.getElementById('postTag').value;

            if (t && d) {
                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <span class="tag tag-${tag.toLowerCase()}">${tag}</span>
                    <h3>${t}</h3>
                    <p>${d}</p>
                    <span class="post-meta">Posted by: Student_User • Just Now</span>
                `;
                forumFeed.prepend(card);
                document.getElementById('topic').value = '';
                document.getElementById('details').value = '';
            } else {
                alert("Please fill in the topic and details!");
            }
        };
    }
});
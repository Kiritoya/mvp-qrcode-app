document.getElementById('participantForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const event_id = urlParams.get('event_id');
  if (!event_id) return alert("ID de l'événement manquant.");

  const formData = new FormData(e.target);
  if (!formData.get('consent')) return alert("Vous devez accepter le consentement.");

  const data = {
    birth_year: parseInt(formData.get('birth_year')),
    gender: formData.get('gender') || ''
  };

  const res = await fetch(`http://localhost:3000/events/${event_id}/participants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Participation enregistrée !");
    e.target.reset();
  } else {
    alert("Erreur lors de l'enregistrement");
  }
});

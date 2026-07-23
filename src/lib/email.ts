import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingConfirmationEmail(booking: {
  bookingRef: string;
  fullName: string;
  email: string;
  carTitle: string;
  pickupDate: string;
  returnDate: string;
  pickupCity: string;
  returnCity: string;
  totalDays: number;
  totalPrice?: number | null;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("Email not configured, skipping email send");
    return;
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: #111; padding: 30px; text-align: center; }
        .header h1 { color: #ef4444; margin: 0; font-size: 28px; letter-spacing: 2px; }
        .header p { color: #999; margin: 5px 0 0; }
        .body { padding: 30px; }
        .ref-box { background: #f8f8f8; border-left: 4px solid #ef4444; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .ref-box p { margin: 0; color: #666; font-size: 14px; }
        .ref-box h2 { margin: 5px 0 0; color: #111; font-size: 24px; letter-spacing: 1px; }
        .details { background: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #666; font-size: 14px; }
        .detail-value { font-weight: bold; color: #111; }
        .footer { background: #111; padding: 20px; text-align: center; }
        .footer p { color: #666; margin: 5px 0; font-size: 13px; }
        .footer a { color: #ef4444; text-decoration: none; }
        .btn { display: inline-block; background: #ef4444; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SONIC CARS</h1>
          <p>Location de voiture premium</p>
        </div>
        <div class="body">
          <h2 style="color: #111;">Demande de réservation reçue ✓</h2>
          <p style="color: #666;">Bonjour <strong>${booking.fullName}</strong>,</p>
          <p style="color: #666;">Nous avons bien reçu votre demande de réservation. Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.</p>
          
          <div class="ref-box">
            <p>Référence de réservation</p>
            <h2>${booking.bookingRef}</h2>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Véhicule</span>
              <span class="detail-value">${booking.carTitle}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Ville de départ</span>
              <span class="detail-value">${booking.pickupCity}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Ville de retour</span>
              <span class="detail-value">${booking.returnCity}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date de départ</span>
              <span class="detail-value">${booking.pickupDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date de retour</span>
              <span class="detail-value">${booking.returnDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Nombre de jours</span>
              <span class="detail-value">${booking.totalDays} jours</span>
            </div>
            ${booking.totalPrice ? `
            <div class="detail-row">
              <span class="detail-label">Prix estimé</span>
              <span class="detail-value" style="color: #ef4444;">${booking.totalPrice.toLocaleString("fr-MA")} MAD</span>
            </div>
            ` : ""}
          </div>
          
          <p style="color: #666;">Pour toute question, n'hésitez pas à nous contacter :</p>
          <p style="color: #666;">📞 <a href="tel:+212600000000" style="color: #ef4444;">+212 600 000 000</a></p>
          <p style="color: #666;">💬 WhatsApp : <a href="https://wa.me/212600000000" style="color: #ef4444;">+212 600 000 000</a></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} SONIC CARS — Tous droits réservés</p>
          <p>Oujda | Tanger | Maroc</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "SONIC CARS <contact@soniccars.ma>",
    to: booking.email,
    subject: `SONIC CARS — Confirmation de réservation ${booking.bookingRef}`,
    html: emailHtml,
  });
}

export async function sendAdminNotificationEmail(booking: {
  bookingRef: string;
  fullName: string;
  email: string;
  phone: string;
  carTitle: string;
  pickupDate: string;
  returnDate: string;
  pickupCity: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "SONIC CARS <contact@soniccars.ma>",
    to: process.env.SMTP_USER,
    subject: `[SONIC CARS] Nouvelle réservation — ${booking.bookingRef}`,
    html: `
      <h2>Nouvelle demande de réservation</h2>
      <p><strong>Réf :</strong> ${booking.bookingRef}</p>
      <p><strong>Client :</strong> ${booking.fullName}</p>
      <p><strong>Email :</strong> ${booking.email}</p>
      <p><strong>Téléphone :</strong> ${booking.phone}</p>
      <p><strong>Véhicule :</strong> ${booking.carTitle}</p>
      <p><strong>De :</strong> ${booking.pickupCity} — ${booking.pickupDate}</p>
      <p><strong>Vers :</strong> ${booking.pickupCity} — ${booking.returnDate}</p>
      <p><a href="${process.env.NEXTAUTH_URL}/admin/reservations">Voir dans le dashboard →</a></p>
    `,
  });
}

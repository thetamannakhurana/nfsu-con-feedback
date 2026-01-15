import { google } from 'googleapis';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Read from control sheet (you'll manually update which panels are active)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'PanelControl!A2:A5', // Rows for Panel 1-4
    });

    const activePanels = [];
    const rows = response.data.values || [];
    
    rows.forEach((row, index) => {
      if (row[0] === 'ACTIVE') {
        activePanels.push(index + 1); // Panel ID
      }
    });

    return Response.json({ activePanels });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ activePanels: [] });
  }
}

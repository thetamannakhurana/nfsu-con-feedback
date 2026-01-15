import { google } from 'googleapis';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Save each question response as a row
    for (const response of data.responses) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Feedback!A:H',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            data.timestamp,
            data.name,
            data.email,
            data.organization,
            data.panelTitle,
            response.question,
            response.answer,
            response.comment
          ]],
        },
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

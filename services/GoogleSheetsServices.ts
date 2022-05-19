const { GoogleSpreadsheet } = require("google-spreadsheet");

class GoogleSheetServices {
  private doc: any;

  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    this.authenticate();
  }

  private async authenticate() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiRptihBVBPP6z\nlhZvReTemUGA6Aon0RC0mYLgftVhI0Qq6ZBvtFnyaP+Xlz+nldSEJ0YyPuNhHzE8\nPA4nC00YOIN7I9D9+zhHLNNjHDEhNzJwcHXYqxhlMJMDklAEFHFskDBCDuilEOZf\nXuDFJv0EE2V1q3h658yGNGzgmneQK3/W4KHobmB16E2pbhnQKUn9sguQ7SFUh1cM\ng0MqWmQ2W2rRkBH0Ra4bQzLFHp588B4ICeg0mSNXzSkHhH+qXd66pECQar1esx01\nMm7CETwGPdq8KhGDSVKMMF2yctVa2y8wYHK8bk036GmnxcFJZwo0uXqdFHH1SWzR\nwREk5hhBAgMBAAECggEAETu6G/jeuHxJqMkBRi0oKH8iUpYh4PdeBK3yVRTHJJ8e\nCcge4YwHytt9fEvw08Nwy52Pof2lgF6TiBvxHVKhC/fRd8H2m4hiwkVHiDSZ35cI\n7WG2FC3cY/+n9zbCNmK05nR8GYHTkVcVfg6ZhHp234hPS7MrcvL7uItn/iTNWoMm\ny+vGdNVTGdNs5r3R58tlwPRnuUrpfS7QhJgILSI+Tmkf732ruDEQbj4O/2aA421g\n3m5TWcG2VP/Svi6slzCPv/0cb8Eq60G9QycXhfhVUN1vW8cnI140uHXpu41Pdvmm\nl3/zweSL+ZImotkCwUHROL3gZgAMf3Rqdr2Bo6ZwiQKBgQDRyFYymF07trTQS4y2\n/1PtCnsanuk0V9Q6vzo/xze3U6SjTGTS19ciYGxIBDluq+DaI91Yx/qMhNd6Ehz/\nLzGtIxarjvvYxIXbo+RqNHL5nnWnds1uT05QmuncHj3scUvvQ3ax2TfTjtDuMy81\nqDC+l5yB/X59Nj4Va7/QYsl8iQKBgQDGBufieokaJeaexc4gBQCnb1uuG/vG/M7a\n+t47ypaqc8pW430R9OmiGJIBe1qOvYz1LNEFlZVbryarIzzxpsI1NDpHDhwq+V9n\nSFfh/BqG57OYD3F383AdTpUgMc7URrOqkfG/re+wIqSvtZOyFJFdTJo0fuNlhnG0\ncVI16AR/+QKBgQCqD8YQ7gNmzQ53bUd9ci8PElgJlJlonWqm1S7bVRyNuXjWCLAT\nXHZCn/gnyYTleuCk9j4SIsux7l7fzp9DH3cd7DwMh7USXP5Gt+4LSsmKIjMuttiC\nfDf4kBzVHI8GhjIQnJg0ROtEzZoB/+xdiyM43p85oc5QoxBhPSAaRnsgQQKBgDIQ\nouWOZ0U2GdVAWzmbKiwqqjodlw0a801HqZHiSS808Q4Am6lDiyHRJnC7eAyofY+q\n0fmgdM9mO9d+pDTQHT+IQcefGJ4AyA77qkRXEXnT8ILcPKq/4DN4n5kxHoJqkZfp\nJ/53Aic8yvglZv7Z1lqJOF9XSTRsxiiBkfBRBXo5AoGBALZ6Hbbgg+TuJ1yble5T\niwtMZ6Fvh9VYOxYcxuM6GxMr0pmtCKA1xd3vc3DLMSLtL+J6fwRsmPEsOxHynm2B\nf59CN/KwyXpRGUtauaFwTpyeYarM94SoTENfpTYTtLxaHtl6A1PHhixXnxjrtzlM\nTMf/7tU/uwLvVMbxVGW8iG7o\n-----END PRIVATE KEY-----\n`,
      // private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
  }

  public async getSpreadSheetData() {
    await this.doc.loadInfo();
    const specialEventsSheet = this.doc.sheetsByIndex[0];
    const videoYoutubeIdsSheet = this.doc.sheetsByIndex[1];
    const MatchCardSheet = this.doc.sheetsByIndex[2];
    const currentChampsSheet = this.doc.sheetsByIndex[3];
    const ppvResultsSheet = this.doc.sheetsByIndex[4];

    const specialEventsRows = await specialEventsSheet.getRows();
    const videoYoutubeIdsRows = await videoYoutubeIdsSheet.getRows();
    const MatchCardRows = await MatchCardSheet.getRows();
    const currentChampsRows = await currentChampsSheet.getRows();
    const ppvResultsRows = await ppvResultsSheet.getRows();

    const specialEvents: Array<any> = specialEventsRows.map((row: any) => row._rawData[0]);
    const youtubeVideoIds: Array<any> = videoYoutubeIdsRows.map((row: any) => row._rawData[0]);
    const MatchCardWWE: Array<any> = MatchCardRows.map((row: any) => row._rawData);
    const MatchCardAEW: Array<any> = MatchCardRows.map((row: any) => row._rawData[1]);
    const currentChapions: Array<any> = currentChampsRows.map((row: any) => row._rawData);
    const ppvResults: Array<any> = ppvResultsRows.map((row: any) => row._rawData);

    return { specialEvents, youtubeVideoIds, MatchCardWWE, MatchCardAEW, ppvResults, currentChapions };
  }
}

export default new GoogleSheetServices();

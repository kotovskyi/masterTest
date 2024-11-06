
// Function to generate a UUID
export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to generate the future date in two formats
export function generateRandomFutureDate() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 1 day to the current date

    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based in JavaScript
    const year = now.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    const date = `${formattedDay}-${formattedMonth}`;
    const birthday = `${year}-${formattedMonth}-${formattedDay}`;

    return { date, birthday };
}
// Function to generate the current date in two formats

export function generateRandomDate() {
    const now = new Date();
    //now.setDate(now.getDate() - 2); // Subtract 1 day from the current date

    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based in JavaScript, so add 1
    const year = now.getFullYear();

    // Format day and month with leading zeros if needed
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Date format dd-mm
    const date = `${formattedDay}-${formattedMonth}`;

    // Date format yyyy-mm-dd
    const birthday = `${year}-${formattedMonth}-${formattedDay}`;

    return { date, birthday };
}

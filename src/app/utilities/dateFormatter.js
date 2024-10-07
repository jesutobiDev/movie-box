export function formatDate(dateString) {
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Function to add ordinal suffix to the day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`; // 11th, 12th, 13th, etc.
      switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
      }
    };

    const dayWithSuffix = getOrdinalSuffix(day);

    return `${dayWithSuffix} ${month}, ${year}`;
}

export function getYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}

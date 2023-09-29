export function formatDate(inputDate: Date ): string {

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = inputDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  
  export function stringToDateformat(inputDate: string): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  }
  

  export function formatDateToCustomString(input: string): string {
    var date=new Date(input);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // Add the ordinal suffix to the day
  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  return formattedDate.replace(
    date.getDate().toString(),
    `${date.getDate()}${daySuffix}`
  );
}




export function formatMinutes(minutes: number): string {
  console.log(minutes);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  var formattedTime = `${hours}h ${remainingMinutes}m`;
  if(remainingMinutes===0){
    formattedTime = `${hours}h`;
  }

 
  return formattedTime;
}



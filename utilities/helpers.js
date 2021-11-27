
    const month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";


module.exports = {

  format_date: ( date ) => {
    
    const d = new Date( date );
    let month_name = month[d.getMonth()];

    return `${new Date( date ).getDate()}-${month_name}-${new Date(date).getFullYear()}`;
  },
  
  get_emoji: () => {
    const randomNum = Math.random();

    if ( randomNum > 0.85 ) {
      randomEmoji = "😇";
    } else if ( randomNum > 0.70 ) {
      randomEmoji = "🤝";
    } else if ( randomNum > 0.55 ) {
      randomEmoji = "🌈";
    } else if ( randomNum > 0.40 ) {
      randomEmoji = "🏆";
    } else if ( randomNum > 0.25 ) {
      randomEmoji = "🧗";
    }
    return `<span for="img" aria-label="randomEmoji">${randomEmoji}</span>`;
  },
  format_amount: ( amount ) => {
    return `${new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD', currencyDisplay:'code', minimumFractionDigits: 0}).format(amount)}`;
  },
  format_commentCount: ( count ) => {
    if (!count) {
      return `No comments yet`;
    }
    return `Comments: ${count}`;
  },
};

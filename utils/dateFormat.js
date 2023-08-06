const { format } = require('date-fns');

function formatDate(timestamp, formatString) {
  return format(new Date(timestamp), formatString);
}

module.exports = formatDate;
function fillSelectionTime() {
    let hour = 0;
    let minutes = 0;
    let time = [];
    for (let i = 0; i < 2 * 24; i++) {
        if (minutes === 0) time.push(hour + ':' + minutes + '0');
        else time.push(hour + ':' + minutes);
        minutes += 30;
        if (i !== 0 && minutes % 60 === 0) hour++;
        if (minutes % 60 === 0) minutes = 0
    }
    return time
}
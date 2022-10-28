const formatDate = (date: Date = new Date()): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    //on incrémente de 1 le mois car en JS cette méthode commence à 0 : janvier = 0, décembre= 11
}

export default formatDate;
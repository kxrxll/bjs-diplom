"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true){
            location.reload();
        }
    })
}
ApiConnector.current(response => {
    if (response.success === true){
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard();
ratesBoard.getRates = () => {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
ratesBoard.getRates();
const ratesRefreshInterval = () => setInterval(ratesBoard.getRates, 60000);
ratesRefreshInterval();

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Баланс успешно пополнен!');
        } else {
            moneyManager.setMessage(false, `Упс! Произошла ошибка! ${response.error}!`);
        }
    })
}
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Валюта успешно конвертирована!');
        } else {
            moneyManager.setMessage(false, `Упс! Произошла ошибка! ${response.error}!`);
        }
    })
}
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод успешно выполнен!');
        } else {
            moneyManager.setMessage(false, `Упс! Произошла ошибка! ${response.error}!`);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success === true){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен!');
        } else {
            favoritesWidget.setMessage(false, `Упс! Произошла ошибка! ${response.error}!`);
        }
    })
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно удален!');
        } else {
            favoritesWidget.setMessage(false, `Упс! Произошла ошибка! ${response.error}!`);
        }
    })
}

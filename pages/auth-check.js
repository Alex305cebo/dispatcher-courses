// Универсальная проверка авторизации для страниц курсов
// Этот скрипт должен быть подключен на всех страницах в папке pages

// Проверка авторизации
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    return JSON.parse(user);
  }
  return null;
}

// Немедленная проверка при загрузке скрипта
(function() {
  const user = checkAuth();
  
  if (!user) {
    alert('Для доступа к курсам необходимо войти в систему или зарегистрироваться');
    window.location.href = '../login.html';
  }
})();

// Дополнительная проверка при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  const user = checkAuth();
  
  if (!user) {
    window.location.href = '../login.html';
  }
});

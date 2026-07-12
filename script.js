<script>
        const burgerBtn = document.getElementById('burgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        function toggleMenu() {
            burgerBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
        }

        burgerBtn.addEventListener('click', toggleMenu);
    </script>
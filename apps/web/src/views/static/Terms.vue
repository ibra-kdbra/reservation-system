<template>
    <div class="static-page">
        <div class="container">
            <h1>Terms of Service</h1>
            <p class="last-updated">Last updated: {{ new Date().toLocaleDateString() }}</p>

            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using NestAsia, you agree to be bound by these Terms. If you disagree with any part
                    of the terms, you may not access the service.
                </p>
            </section>

            <section>
                <h2>2. User Accounts</h2>
                <p>
                    You are responsible for safeguarding the password that you use to access the service and for any
                    activities or actions under your password.
                </p>
            </section>

            <section>
                <h2>3. Booking & Cancellations</h2>
                <p>
                    Bookings are subject to the host's cancellation policy as stated in the listing. NestAsia
                    facilitates
                    payments but is not a party to the rental agreement between hosts and guests.
                </p>
            </section>
        </div>
    </div>
</template>

<style scoped>
.static-page {
    padding: 4rem 0;
}

h1 {
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
}

.last-updated {
    color: var(--color-gray-500);
    margin-bottom: 3rem;
}

section {
    margin-bottom: 2.5rem;
}

h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

p {
    line-height: 1.6;
    color: var(--color-gray-700);
    max-width: 800px;
}
</style>

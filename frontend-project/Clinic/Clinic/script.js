// User Management - Demo Accounts
        let users = [
            {
                name: 'Mr. Jack Hans',
                email: 'patient@example.com',
                password: 'patient123',
                role: 'patient'
            },
            {
                name: 'Dr. Niranjana Gawalikar',
                email: 'niranjana@example.com',
                password: 'doctor123',
                role: 'doctor'
            }
        ];

        let currentUser = null;

        // Sample Data
        let appointments = [
            { id: 1, name: 'John Smith', doctor: 'Dr. Ruchita Pujar', test: 'Blood Test', date: '2025-10-08', status: 'Pending' },
            { id: 2, name: 'Emily Davis', doctor: 'Dr. Niranjana Gawalikar', test: 'Stool Test', date: '2025-10-09', status: 'Completed' },
            { id: 3, name: 'Michael Brown', doctor: 'Dr. Ruchita Pujar', test: 'Urine Test', date: '2025-10-10', status: 'Pending' },
            { id: 4, name: 'Sarah Wilson', doctor: 'Dr. Niranjana Gawalikar', test: 'Plasma Test', date: '2025-10-11', status: 'Completed' },
            { id: 5, name: 'David Lee', doctor: 'Dr. Ruchita Pujar', test: 'Swab Test', date: '2025-10-12', status: 'Cancelled' },
            { id: 6, name: 'Lisa Anderson', doctor: 'Dr. Niranjana Gawalikar', test: 'Blood Test', date: '2025-10-13', status: 'Pending' }
        ];

        let reports = [
            { id: 'R001', name: 'Emily Davis', date: '2025-10-03', test: 'Stool Test', status: 'Ready' },
            { id: 'R002', name: 'John Smith', date: '2025-10-05', test: 'Blood Test', status: 'Processing' },
            { id: 'R003', name: 'Sarah Wilson', date: '2025-10-06', test: 'Plasma Test', status: 'Ready' },
            { id: 'R004', name: 'Michael Brown', date: '2025-10-07', test: 'Urine Test', status: 'Processing' }
        ];

        // Role selector functionality
        document.querySelectorAll('.role-option').forEach(option => {
            option.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.role-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                this.querySelector('input[type="radio"]').checked = true;
            });
        });

        function switchAuthTab(tab) {
            const tabs = document.querySelectorAll('.auth-tab');
            const forms = document.querySelectorAll('.auth-form');
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => {
                f.style.opacity = '0';
                f.style.transform = 'translateX(20px)';
            });
            
            setTimeout(() => {
                forms.forEach(f => f.classList.remove('active'));
                
                if (tab === 'login') {
                    tabs[0].classList.add('active');
                    const loginForm = document.getElementById('loginForm');
                    loginForm.classList.add('active');
                    setTimeout(() => {
                        loginForm.style.opacity = '1';
                        loginForm.style.transform = 'translateX(0)';
                    }, 50);
                } else {
                    tabs[1].classList.add('active');
                    const registerForm = document.getElementById('registerForm');
                    registerForm.classList.add('active');
                    setTimeout(() => {
                        registerForm.style.opacity = '1';
                        registerForm.style.transform = 'translateX(0)';
                    }, 50);
                }
            }, 300);
        }

        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const role = document.querySelector('input[name="loginRole"]:checked').value;

            const user = users.find(u => u.email === email && u.password === password && u.role === role);

            if (user) {
                currentUser = user;
                loadUserInterface();
                
                document.getElementById('authScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                
                showMessage('viewMessage', 'Welcome back, ' + user.name + '!', 'success');
            } else {
                showMessage('loginMessage', 'Invalid credentials or wrong role selected. Please try again.', 'error');
            }
        }

        function handleRegister(event) {
            event.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const role = document.querySelector('input[name="regRole"]:checked').value;

            if (password.length < 8) {
                showMessage('registerMessage', 'Password must be at least 8 characters long.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('registerMessage', 'Passwords do not match!', 'error');
                return;
            }

            if (users.find(u => u.email === email)) {
                showMessage('registerMessage', 'Email already registered. Please login instead.', 'error');
                return;
            }

            const newUser = {
                name: name,
                email: email,
                password: password,
                role: role
            };

            users.push(newUser);
            
            showMessage('registerMessage', 'Registration successful! Please login to continue.', 'success');
            
            document.getElementById('registerForm').reset();
            
            setTimeout(() => {
                switchAuthTab('login');
            }, 2000);
        }

        function loadUserInterface() {
            const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2);
            document.getElementById('userAvatar').textContent = initials;
            document.getElementById('userNameDisplay').textContent = currentUser.name;
            document.getElementById('userRoleDisplay').textContent = currentUser.role === 'patient' ? 'Patient' : 'Doctor';
            
            const nav = document.getElementById('mainNav');
            
            if (currentUser.role === 'patient') {
                document.getElementById('headerSubtitle').textContent = 'Your Health, Our Priority';
                nav.innerHTML = `
                    <div class="nav-buttons">
                        <button class="nav-btn btn-add" onclick="showPage('bookAppointment')">Book Appointment</button>
                        <button class="nav-btn btn-view" onclick="showPage('viewAppointments')">View Appointments</button>
                    </div>
                `;
                showPage('bookAppointment');
                document.getElementById('actionHeader').classList.add('hidden');
            } else {
                document.getElementById('headerSubtitle').textContent = 'Professional Medical Dashboard';
                nav.innerHTML = `
                    <div class="nav-buttons">
                        <button class="nav-btn btn-view" onclick="showPage('viewAppointments')">View Appointments</button>
                        <button class="nav-btn btn-report" onclick="showPage('newReport')">New Report</button>
                        <button class="nav-btn btn-add" onclick="showPage('updateStatus')">Update Status</button>
                    </div>
                `;
                showPage('viewAppointments');
                document.getElementById('actionHeader').classList.remove('hidden');
            }
            
            renderAppointments();
        }

        function handleLogout() {
            currentUser = null;
            document.getElementById('authScreen').classList.remove('hidden');
            document.getElementById('mainApp').classList.add('hidden');
            document.getElementById('loginForm').reset();
        }

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            
            if (pageId === 'updateStatus') {
                renderUpdateTable();
            }
        }

        function addAppointment(event) {
            event.preventDefault();
            
            const name = document.getElementById('patientName').value;
            const doctor = document.getElementById('doctor').value;
            const test = document.getElementById('test').value;
            const date = document.getElementById('appointmentDate').value;

            const newAppointment = {
                id: appointments.length + 1,
                name: name,
                doctor: doctor,
                test: test,
                date: date,
                status: 'Pending'
            };

            appointments.push(newAppointment);
            
            showMessage('addMessage', 'Appointment booked successfully! Appointment #' + String(newAppointment.id).padStart(3, '0'), 'success');
            
            document.getElementById('appointmentForm').reset();
            renderAppointments();
        }

        function renderAppointments() {
            const tbody = document.getElementById('appointmentsTable');
            tbody.innerHTML = '';

            appointments.forEach((apt, index) => {
                const statusClass = apt.status === 'Completed' ? 'status-completed' : 
                                  apt.status === 'Cancelled' ? 'status-cancelled' : 'status-pending';
                
                let actionCell = '';
                if (currentUser && currentUser.role === 'doctor') {
                    actionCell = `
                        <td>
                            <select class="action-btn btn-update" onchange="updateStatus(this, ${index})">
                                <option value="Pending" ${apt.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Completed" ${apt.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                <option value="Cancelled" ${apt.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </td>
                    `;
                }
                
                const row = `
                    <tr>
                        <td>${String(apt.id).padStart(3, '0')}</td>
                        <td>${apt.name}</td>
                        <td>${apt.doctor}</td>
                        <td>${apt.test}</td>
                        <td>${apt.date}</td>
                        <td><span class="status-badge ${statusClass}">${apt.status}</span></td>
                        ${actionCell}
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        }

        function renderUpdateTable() {
            const tbody = document.getElementById('updateTable');
            tbody.innerHTML = '';

            appointments.forEach((apt, index) => {
                const statusClass = apt.status === 'Completed' ? 'status-completed' : 
                                  apt.status === 'Cancelled' ? 'status-cancelled' : 'status-pending';
                
                const row = `
                    <tr>
                        <td>${String(apt.id).padStart(3, '0')}</td>
                        <td>${apt.name}</td>
                        <td>${apt.doctor}</td>
                        <td>${apt.test}</td>
                        <td>${apt.date}</td>
                        <td><span class="status-badge ${statusClass}">${apt.status}</span></td>
                        <td>
                            <select class="action-btn btn-update" onchange="updateStatusFromPage(this, ${index})">
                                <option value="Pending" ${apt.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Completed" ${apt.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                <option value="Cancelled" ${apt.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        }

        function updateStatus(select, index) {
            appointments[index].status = select.value;
            renderAppointments();
            showMessage('viewMessage', 'Appointment status updated successfully!', 'success');
        }

        function updateStatusFromPage(select, index) {
            appointments[index].status = select.value;
            renderUpdateTable();
            showMessage('updateMessage', 'Appointment status updated successfully!', 'success');
        }

        function addReport(event) {
            event.preventDefault();
            
            const patient = document.getElementById('reportPatient').value;
            const test = document.getElementById('reportTest').value;
            const date = document.getElementById('reportDate').value;
            const status = document.getElementById('reportStatus').value;

            const newReport = {
                id: 'R' + String(reports.length + 1).padStart(3, '0'),
                name: patient,
                date: date,
                test: test,
                status: status
            };

            reports.push(newReport);
            
            showMessage('reportMessage', 'Report created successfully! Report ID: ' + newReport.id, 'success');
            
            document.getElementById('reportForm').reset();
        }

        function showMessage(elementId, message, type) {
            const messageEl = document.getElementById(elementId);
            if (messageEl) {
                messageEl.textContent = message;
                messageEl.className = `message ${type} show`;
                
                setTimeout(() => {
                    messageEl.classList.remove('show');
                }, 5000);
            }
        }

        // Set date constraints
        window.addEventListener('DOMContentLoaded', () => {
            const today = new Date().toISOString().split('T')[0];
            const appointmentDate = document.getElementById('appointmentDate');
            const patientDOB = document.getElementById('patientDOB');
            const reportDate = document.getElementById('reportDate');
            
            if (appointmentDate) appointmentDate.setAttribute('min', today);
            if (patientDOB) patientDOB.setAttribute('max', today);
            if (reportDate) reportDate.value = today;
        });
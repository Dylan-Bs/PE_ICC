from django.contrib.auth.models import User
 
def initialize():
    if not User.objects.filter(username='adminPEICC').count():
        print("Creating superuser")
        user = User.objects.create_user('adminPEICC', 'admin@peicc.com', 'adminpeic*')
        user.first_name = 'Admin'
        user.last_name = 'PeICC'
        user.is_staff = True
        user.is_superuser = True
        user.save()
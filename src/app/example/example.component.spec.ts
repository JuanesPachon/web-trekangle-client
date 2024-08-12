import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with required controls', () => {
    const form = component.formulario;
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('username')).toBeTrue();
    expect(form.contains('password')).toBeTrue();
  });

  it('should validate email, username, and password controls', () => {
    const { email, username, password } = component.formulario.controls;

    email.setValue('test@test.com');
    expect(email.valid).toBeTrue();

    username.setValue('testuser');
    expect(username.valid).toBeTrue();

    password.setValue('123456');
    expect(password.valid).toBeTrue();
  });

  it('should submit the form if valid', () => {
    spyOn(console, 'log');
    component.formulario.setValue({
      email: 'test@test.com',
      username: 'testuser',
      password: '123456',
    });

    component.submitForm();
    expect(console.log).toHaveBeenCalledWith('Formulario enviado', {
      email: 'test@test.com',
      username: 'testuser',
      password: '123456',
    });
  });
});

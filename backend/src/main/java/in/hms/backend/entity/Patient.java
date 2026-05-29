package in.hms.backend.entity;

import jakarta.persistence.*;

@Entity // this tell database that the class Patient will become a table 
@Table(name= "patients")
public class Patient {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment the ID
    private Long id;

    private int age;
    private String gender;
    private String address;
    private String disease;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    // Default Constructor
    public Patient() {
    }

    // Parameterized Constructor
    public Patient(Long id, int age, String gender, String address, String disease, User user) {
        this.id = id;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.disease = disease;
        this.user=user;
    }
    // Getters 
    public Long getId() {return id;}
    public int getAge() {return age;}
    public String getGender() {return gender;}
    public String getAddress() {return address;}
    public String getDisease() {return disease;}
    public User getUser(){return user;}
    // Setters
    public void setId(Long id) {this.id = id;}
    public void setAge(int age) {this.age = age;}
    public void setGender(String gender) {this.gender = gender;}
    public void setAddress(String address) {this.address = address;}
    public void setDisease(String disease) {this.disease = disease;}
    public void setUser(User user) {this.user = user;}
    // toString()

    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", age='" + age +
                ", gender='" + gender + '\'' +
                ", address='" + address + '\'' +
                ", disease='" + disease + '\'' +
                '}';
    }
}

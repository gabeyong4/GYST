<template>
    <div class="TopBar">
        <h1>Profile Page</h1>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user-2">

                    <div class="widget-user-header bg-warning">
                        <div class="widget-user-image">
                            <img 
                            class="rounded-circle" 
                            height="80px" 
                            width="auto" 
                            src="@/assets/gabriel.png" 
                            alt="@/assets/gyst_logo.png">
                        </div>
                        <h3 class="widget-user-username">Gabriel Yong</h3>
                        <h5 class="widget-user-desc">Product Owner</h5>
                    </div>

                    <div class="card-footer p-0">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    Projects <span class="float-right badge bg-primary">31</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    Tasks <span class="float-right badge bg-info">5</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    Completed Projects <span class="float-right badge bg-success">12</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link">
                                    Followers <span class="float-right badge bg-danger">842</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="info me-1">
            <div class="card-header p-2">
                <ul class="nav nav-pills">
                    <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div class="tab-pane active" id="settings">
                        <form class="form-horizontal">
                            <div class="form-group row">
                                <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="inputName" placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputName2" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputName2" placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputSkills" class="col-sm-2 col-form-label">Skills</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                                </div>
                            </div>
                            
                            <div class="form-group row mt-1">
                                <div class="offset-sm-2 col-sm-10">
                                    <button type="submit" class="btn btn-danger">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
export default {

}
</script>

<style>
.container {
    /* flex-direction: row; */
    background-color: #345;
    display: block;
    /* align-content: center; */
    /* flex: auto; */
    /* justify-content: center; */
}

.info {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
    padding: 1%;
    margin: auto;
}

.TopBar {
    padding: 20px;
    text-align: center;
    background-color: #474e5d;
    color: white;
  }

.elevation-2 {
    box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)!important;
}

.card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.widget-user-image {
    float: left;
    padding: 10px
}

.widget-user-2.widget-user-header {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.widget-user-2 .widget-user-username {
    font-size: 25px;
    font-weight: 300;
    margin-bottom: 5px;
    margin-top: 4%;
}

.widget-user-2 .widget-user-desc {
    margin-top: 0;
}
</style>
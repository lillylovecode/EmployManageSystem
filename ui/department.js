const department =
{
    template: `
    <div>

    <button type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#myModal"
    @click="addClick()">
    Add Department
    </button>

    <table class="table table-striped">
    <thead>
        <tr>
            <th>
                <div class="d-flex flex-row">

                <input class="form-control m-2"
                    v-model="DepartmentIdFilter"
                    v-on:keyup="FilterFn()"
                    placeholder="Filter">

                    <button type="button" class="btn btn-light"
                    @click="sortResult('DepartmentId',true)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                    </button>

                    <button type="button" class="btn btn-light"
                    @click="sortResult('DepartmentId',false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </button>
                </div>
                DepartmentId
            </th>
            <th>
                <div class="d-flex flex-row">

                <input class="form-control m-2"
                    v-model="DepartmentNameFilter"
                    v-on:keyup="FilterFn()"
                    placeholder="Filter">

                    <button type="button" class="btn btn-light"
                    @click="sortResult('DepartmentName',true)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                    </button>

                    <button type="button" class="btn btn-light"
                    @click="sortResult('DepartmentName',false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </button>
                </div>
                DepartmentName
            </th>
            <th>
                Options
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="dep in departments">
            <td>{{dep.DepartmentId}}</td>
            <td>{{dep.DepartmentName}}</td>
            <td>
                <button type="button" class="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                @click="editClick(dep)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                <button type="button" class="btn btn-light mr-1"
                @click="deleteClick(dep.DepartmentId)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>
            </td>
        </tr>
    </tbody>
    </table>
    
    <div class="modal fade" id="myModal" tabindex="-1"
        aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">{{modalTitle}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>

        <div class="modal-body">
            <div class="imput-group mb-3">
                <span class="input-group-text">Department Name</span>
                <input type="text" class="form-control" v-model="DepartmentName">
            </div>

            <button type="button" @click="createClick()"
            v-if="DepartmentId==0" class="btn btn-primary">
            Create
            </button>
            <button type="button" @click="updateClick()"
            v-if="DepartmentId!=0" class="btn btn-primary">
            Update
            </button>
        </div>
    </div>
    </div>
    </div>
    

    </div>
    `,

    data() {
        return {
            departments: [],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0,
            DepartmentIdFilter:"",
            DepartmentNameFilter:"",
            departmentsWithoutFilter:[]
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "department")
                .then((response) => {
                    this.departments = response.data;
                    this.departmentsWithoutFilter = response.data;
                });
        },
        addClick(){
            this.modalTitle="Add Department";
            this.DepartmentId=0;
            this.DepartmentName="";
        },
        editClick(dep){
            this.modalTitle="Edit Department";
            this.DepartmentId=dep.DepartmentId;
            this.DepartmentName=dep.DepartmentName;
        },
        createClick(){
            axios.post(variables.API_URL + "department",{
                DepartmentName:this.DepartmentName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick(){
            axios.put(variables.API_URL + "department",{
                DepartmentId:this.DepartmentId,
                DepartmentName:this.DepartmentName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id){
            if(!confirm("Are You Sure?")){
                return;
            }

            axios.delete(variables.API_URL + "department/"+id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        FilterFn(){
            var DepartmentIdFilter = this.DepartmentIdFilter;
            var DepartmentNameFilter = this.DepartmentNameFilter;

            this.departments = this.departmentsWithoutFilter.filter(
                function(el){
                    return el.DepartmentId.toString().toLowerCase().includes(
                        DepartmentIdFilter.toString().trim().toLowerCase()
                    )&&
                    el.DepartmentName.toString().toLowerCase().includes(
                        DepartmentNameFilter.toString().trim().toLowerCase()
                    )
                }
            );
        },
        sortResult(prop,asc){
            this.departments=this.departmentsWithoutFilter.sort(function(a,b){
                if(asc){
                    return (a[prop]>b[prop]) ? 1 : ( (a[prop]<b[prop]) ? -1 : 0 );
                }else{
                    return (b[prop]>a[prop]) ? 1 : ( (b[prop]<a[prop]) ? -1 : 0 );
                }
            })
        }
    },
    mounted() {
        this.refreshData();
    },
}
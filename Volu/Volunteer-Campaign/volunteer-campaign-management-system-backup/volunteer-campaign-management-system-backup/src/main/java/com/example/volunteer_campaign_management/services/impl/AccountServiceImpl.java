package com.example.volunteer_campaign_management.services.impl;

import com.example.volunteer_campaign_management.dtos.AccountDTO;
import com.example.volunteer_campaign_management.entities.AccountEntity;
import com.example.volunteer_campaign_management.entities.DepartmentEntity;
import com.example.volunteer_campaign_management.entities.ProfileEntity;
import com.example.volunteer_campaign_management.entities.RoleEntity;
import com.example.volunteer_campaign_management.mappers.MapperUtil;
import com.example.volunteer_campaign_management.repositories.AccountRepository;
import com.example.volunteer_campaign_management.repositories.DepartmentRepository;
import com.example.volunteer_campaign_management.repositories.ProfileRepository;
import com.example.volunteer_campaign_management.repositories.RoleRepository;
import com.example.volunteer_campaign_management.services.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import static com.example.volunteer_campaign_management.services.impl.ProfileServiceImpl.getAccountDTO;

@Service
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final DepartmentRepository departmentRepository;
    private final MapperUtil mapperUtil;
    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository, ProfileRepository profileRepository, DepartmentRepository departmentRepository, MapperUtil mapperUtil) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
        this.profileRepository = profileRepository;
        this.departmentRepository = departmentRepository;
        this.mapperUtil = mapperUtil;
    }

    @Override
    public List<AccountDTO> getAllAccounts() {
        List<AccountEntity> accountEntities = accountRepository.getAllAccounts();
        List<AccountDTO> accountDTOS = new ArrayList<>();
        accountEntities.stream().forEach(accountEntity -> {
            AccountDTO accountDTO = new AccountDTO(accountEntity.getAccountId(),
                    accountEntity.getProfileEntity().getFirstname(),
                    accountEntity.getProfileEntity().getLastname(),
                    accountEntity.getProfileEntity().getAvatar(),
                    accountEntity.getProfileEntity().getAddress(),
                    accountEntity.getEmail(),
                    accountEntity.getPhone(),
                    accountEntity.getPassword(),
                    accountEntity.getRoleEntity().getRoleId(),
                    accountEntity.getDepartmentEntity().getDepartmentId(),
                    accountEntity.getRoleEntity().getName(),
                    accountEntity.getStatus(),
                    accountEntity.getDepartmentEntity().getName(),
                    ""
                    );
            accountDTOS.add(accountDTO);
        });
        return accountDTOS;
    }

    @Override
    @Transactional
    public AccountDTO createNewAccount(AccountDTO accountDTO) {
        System.out.println(accountDTO);
        String regexPattern = "^(.+)@(\\S+)$";
        Pattern pattern = Pattern.compile(regexPattern);
        try {
            if (!accountDTO.getEmail().isEmpty()) {
                if (pattern.matcher(accountDTO.getEmail()).matches()) {
                    if (!accountRepository.existsByEmail(accountDTO.getEmail())) {
                        AccountEntity accountEntity = new AccountEntity();
                        accountEntity.setRoleEntity(roleRepository.getOne(accountDTO.getRoleId()));
                        accountEntity.setEmail(accountDTO.getEmail());
                        accountEntity.setPassword(accountDTO.getPassword());
                        accountEntity.setPhone(accountDTO.getPhone());
                        accountEntity.setDepartmentEntity(departmentRepository.getOne(accountDTO.getDepartmentId()));
                        //default soft disable status
                        accountEntity.setStatus((byte) 1);
                        //set value to profile
                        ProfileEntity profileEntity = new ProfileEntity(
                                0, accountDTO.getFirstname(),
                                accountDTO.getLastname(),
                                accountDTO.getAvatar(),
                                accountDTO.getAddress(),
                                (byte) 0);
                        accountEntity.setProfileEntity(profileEntity);
                        accountRepository.save(accountEntity);
                        return accountDTO;
                    }else {
                        return new AccountDTO(200, "Email is duplicated", null, null, null, null, null, null, 0, 0, null, null, null, null);
                    }
                }
            }
            return null;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public AccountDTO getAccountById(int accountId) {
        try {
            AccountEntity accountEntity = accountRepository.findById(accountId).get();
            AccountDTO accountDTO = new AccountDTO();
            accountDTO.setFirstname(accountEntity.getProfileEntity().getFirstname());
            accountDTO.setLastname(accountEntity.getProfileEntity().getLastname());
            accountDTO.setPhone(accountEntity.getPhone());
            accountDTO.setEmail(accountEntity.getEmail());
            accountDTO.setAvatar(accountEntity.getProfileEntity().getAvatar());
            accountDTO.setRoleId(accountEntity.getRoleEntity().getRoleId());
            accountDTO.setDepartmentId(accountEntity.getDepartmentEntity().getDepartmentId());
            accountDTO.setPassword(accountEntity.getPassword());
            accountDTO.setAddress(accountEntity.getProfileEntity().getAddress());
            accountDTO.setAccountId(accountId);
            return accountDTO;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    @Transactional
    public AccountDTO updateAccount(int accountId, AccountDTO updatedAccountDTO) {
        String regexPattern = "^(.+)@(\\S+)$";
        Pattern pattern = Pattern.compile(regexPattern);

        try {
            AccountEntity accountEntity = accountRepository.findById(accountId).orElse(null);

            if (accountEntity != null) {
                if (updatedAccountDTO.getEmail() != null && pattern.matcher(updatedAccountDTO.getEmail()).matches()) {
                    if (!accountRepository.existsByEmailAndAccountIdNot(updatedAccountDTO.getEmail(), accountId)) {
                        accountEntity.setEmail(updatedAccountDTO.getEmail());
                    } else {
                        throw new DuplicateEmailException("Email is already in use");
                    }
                }



                if (updatedAccountDTO.getPhone() != null && !updatedAccountDTO.getPhone().isEmpty()) {
                    accountEntity.setPhone(updatedAccountDTO.getPhone());
                }

                if (updatedAccountDTO.getRoleId() != 0) {
                    accountEntity.setRoleEntity(roleRepository.getOne(updatedAccountDTO.getRoleId()));
                }

                if (accountEntity.getPassword().equals(updatedAccountDTO.getCurrentPassword())) {
                    if (updatedAccountDTO.getPassword() != null && !updatedAccountDTO.getPassword().isEmpty()) {
                        // Update password only if a new password is provided
                        accountEntity.setPassword(updatedAccountDTO.getPassword());
                    }
                }else {
                    throw new DuplicateEmailException("Mật khẩu cũ không đúng!");
                }

                return getAccountDTO(updatedAccountDTO, accountEntity, accountRepository);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the entire exception stack trace
        }

        return null;
    }

    public class DuplicateEmailException extends RuntimeException {
        public DuplicateEmailException(String message) {
            super(message);
        }
    }



    public void enableAccount(String email) {
        AccountEntity accountEntity = accountRepository.findByEmail(email);
        if (accountEntity == null) {
            throw new RuntimeException("Account not found");
        }
        accountEntity.setStatus((byte) 1);
        accountRepository.save(accountEntity);
    }

    public void disableAccount(String email) {
        AccountEntity accountEntity = accountRepository.findByEmail(email);
        if (accountEntity == null) {
            throw new RuntimeException("Account not found");
        }
        accountEntity.setStatus((byte) 0);
        accountRepository.save(accountEntity);
    }

    @Override
    public List<AccountDTO> searchAccount(Optional<String> query) {
        try {
            List<AccountEntity> accountEntities = new ArrayList<>();
            if (!query.isPresent()) {
                return getAllAccounts();
            }
            {
                accountEntities = accountRepository.findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(query, query);
                if (accountEntities.isEmpty()) {
                    List<ProfileEntity> profileEntities = this.profileRepository.findByAddressContainingIgnoreCaseOrFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(query,query,query);
                    for (ProfileEntity profileEntity : profileEntities) {
                        accountEntities.addAll(this.accountRepository.findByProfileEntity(profileEntity));
                    }
                }
                    List<RoleEntity> roleEntities = this.roleRepository.findByName(query);
                    for (RoleEntity roleEntity : roleEntities) {
                        accountEntities.addAll(this.accountRepository.findByRoleEntity(roleEntity));

                }
                List<DepartmentEntity> departmentEntities = this.departmentRepository.findByNameContainingIgnoreCase(query);
                for (DepartmentEntity departmentEntity : departmentEntities) {
                    accountEntities.addAll(this.accountRepository.findByDepartmentEntity(departmentEntity));
                }
                return mapperUtil.mapToListAccountDTO(accountEntities);
            }
        } catch (Exception e) {
            e.getMessage();
        }
        return null;
    }


    @Override
    public AccountEntity save(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }
}
